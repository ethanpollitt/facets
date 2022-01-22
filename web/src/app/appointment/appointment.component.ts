import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from '../app.service';
import { IconButtonOptions, ToolbarOptions } from '../nav/toolbar/toolbar.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { ConfirmDiagComponent } from '../shared/components/confirm-diag/confirm-diag.component';
import { Appointment, AppointmentStatus } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { CreateUpdateAppointmentComponent } from './create-update/create-update.component';
import { Device } from '../shared/models/device';
import { IconOptions } from '../shared/models/icon';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  hasAppointments: boolean = false;
  statuses: Map<number, { status: AppointmentStatus, date: Date, display: string }>;
  device: Device;
  displayedFields: string[] = [];
  selected: number[] = [];
  
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>();
  numRecords: number = 0;
  
  private sort: MatSort;
  private paginator: MatPaginator;
  private _appointments: Appointment[];
  private allFields: string[] = ["client", "date", "windowLength", "technician", "customerNotes", "status"];
  private tabletFields: string[] = ["client", "date", "technician", "status"];
  private mobileFields: string[] = ["client", "date", "technician"];

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private toolbarService: ToolbarService,
    private appService: AppService
  ) {
    this.appService.deviceUpdates.subscribe(_ => {
      this.device = _;
      this.setDisplayedFields();
    });
  }

  ngOnInit(): void {
    this.setBtns({ add: true });

    const s = this.appointmentService.getAppointments().subscribe(_ => {
      // Set internal clients object & initialize data source
      this._appointments = _;
      this.hasAppointments = this._appointments.length > 0;
      this.sortAppointments();
      this.dataSource.data = this._appointments;
      if (this.paginator)
        this.dataSource.paginator = this.paginator;
      if (this.sort)
        this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        if (typeof item === 'object') {
          switch (property) {
            case 'client': return  item.client['id'];
            case 'tech': return  item.technician['id'];
            default: return item[property];
          }
        } else
          return item[property];
      }

      this.setStatuses();

      s.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    if (!this.dataSource.paginator)
      this.dataSource.paginator = this.paginator;
  }

  @ViewChild('paginatorEle') 
  set matPaginator( paginator: MatPaginator){
    this.paginator = paginator;
  }

  @ViewChild(MatSort) 
  set matSort( sort: MatSort){
    this.sort = sort;
  }

  get appointments() {
    return this._appointments;
  }

  public onRowClick = (i: number): void => {
    if (this.selected.includes(i))
      this.selected = [];
      // this.selected = this.selected.filter(_ => _ !== i);
    else
      this.selected = [i];
      // this.selected.push(i);

    this.setBtns({ 
      add: true, 
      detail: this.selected.length > 0, 
      cancel: this.selected.length > 0 && !this._appointments[i].cancelled,
      update: this.selected.length === 1 
    });
  }

  private setBtns = (btnIds: { add?: boolean, update?: boolean, cancel?: boolean, detail?: boolean }): void => {
    const newBtns: IconButtonOptions[] = [];
    if (btnIds.add)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(), 'accent', 'add_circle_outline', 'Create Appointment'));
    // if (btnIds.detail)
    //   newBtns.push(new IconButtonOptions(() => this.showDetailDiag(this.clients[this.selected[0]]), 'accent', 'description', `Show details on selected Client`));
    if (btnIds.update)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(this._appointments[this.selected[0]]), 'accent', 'create', 'Update selected Appointment'));
    if (btnIds.cancel)
      newBtns.push(new IconButtonOptions(() => this.showCancelDiag(this._appointments[this.selected[0]]), 'accent', 'cancel', `Cancel the selected Appointment${this.selected.length > 1 ? 's' : ''}`));

    const options: ToolbarOptions = {
      title: 'Appointments',
      buttons: newBtns
    };
    this.toolbarService.setOptions(options);
  }

  private showCreateUpdateDiag = (appt?: Appointment): void => {
    const dialogRef = this.dialog.open(CreateUpdateAppointmentComponent, {
      data: appt ? { appointment: appt } : null,
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The (${appt ? 'update' : 'create'}) dialog was closed `);
      if (_) {
        if (appt)
          this._appointments = this._appointments.filter(_ => _.id !== appt.id);
        this._appointments.push(_);
        this._appointments.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        this.afterAppointmentsChange();
        this.setStatuses();
      }
    });
  }

  private showCancelDiag = (appt: Appointment): void => {
    const dialogRef = this.dialog.open(ConfirmDiagComponent, {
      data: { title: 'Confirm Cancellation', message: 'Are you sure you want to cancel this appointment?', icon: new IconOptions('warning', 'accent') },
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The cancel dialog was closed`);
      if (_) {
        appt.cancelled = true;
        this.appointmentService.updateAppointment(appt).subscribe(updatedAppt => {
          this._appointments = this._appointments.filter(_ => _.id !== appt.id);
          this._appointments.push(updatedAppt);
          this._appointments.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
          this.afterAppointmentsChange();
          this.setStatuses();
        });
      }
    });
  }

  // private showDetailDiag = (client: Client): void => {
  //   const dialogRef = this.dialog.open(ClientDetailComponent, {
  //     data: { client: client },
  //     autoFocus: true,
  //     disableClose: true,
  //     hasBackdrop: true,
  //     minWidth: 320
  //   });

  //   dialogRef.afterClosed().subscribe(_ => {
  //     console.log(`The detail dialog was closed`);
  //   });
  // }

  private setStatuses = () => {
    this.statuses = new Map<number, { status: AppointmentStatus, date: Date, display: string }>();
    this._appointments.forEach(_ => {
      let date;
      switch (_.status) {
        case AppointmentStatus.COMPLETED:
          date = _.completed[1];
          break;
        case AppointmentStatus.STARTED:
          date = _.started[1];
          break;
        case AppointmentStatus.ROUTED:
          date = _.routed[1];
          break;
      };
      this.statuses.set(_.id, { status: _.status, date: date, display: _.getDisplayStatus() + (date ? ` (${date})` : '') });
    });
  }

  private afterAppointmentsChange = (): void => {
    this.hasAppointments = this._appointments.length > 0;
    this.sortAppointments();
    this.dataSource.data = this._appointments;
    this.dataSource._updateChangeSubscription();
  }

  private setDisplayedFields = (): void => {
    if (this.device.isDesktop)
      this.displayedFields = this.allFields.map(_ => _);
    else if (this.device.isTablet)
      this.displayedFields = this.tabletFields.map(_ => _);
    else
      this.displayedFields = this.mobileFields.map(_ => _);
  }

  private sortAppointments = (): void => {
    this._appointments.sort((a, b) => {
      if (a.cancelled && !b.cancelled)
        return 1;
      else if (a.cancelled == b.cancelled)
        return 0;
      return -1;
    });
  }
}
