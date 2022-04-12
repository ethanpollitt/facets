import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from '../app.service';
import { ButtonOptionsBase, IconButtonOptions, MenuButtonOptions, ToolbarOptions } from '../nav/toolbar/toolbar.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { ConfirmDiagComponent } from '../shared/components/confirm-diag/confirm-diag.component';
import { Appointment, AppointmentStatus } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { CreateUpdateAppointmentComponent } from './create-update/create-update.component';
import { Device } from '../shared/models/device';
import { IconOptions } from '../shared/models/icon';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenu } from '@angular/material/menu';
import { FormControl } from '@angular/forms';
import { UpdateStatusComponent } from './update-status/update-status.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @ViewChild(MatMenu) viewMenu: MatMenu;

  hasAppointments: boolean = false;
  statuses: Map<number, { status: AppointmentStatus, date: Date, display: string }>;
  displayedFields: string[] = [];
  selected: number[] = [];
  view: 'calendar' | 'list' = 'calendar';
  apptStatuses = AppointmentStatus;
  
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>();
  numRecords: number = 0;

  searchControl: FormControl = new FormControl(null);
  filterControl: FormControl = new FormControl();
  
  private device: Device;
  private sort: MatSort;
  private paginator: MatPaginator;
  private _appointments: Appointment[];
  private allFields: string[] = ['client', 'date', 'windowLength', 'technician', 'customerNotes', 'status'];
  private tabletFields: string[] = ['client', 'date', 'technician', 'status'];
  private mobileFields: string[] = ['client', 'date', 'technician'];

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
    this.reloadAppointments();

    this.searchControl.valueChanges.subscribe((_: string) => {
      if ([null, undefined, ''].includes(_)) {
        this.dataSource.data = this._appointments;
      } else {
        const searchStrings: string[] = _.toLowerCase().split(' ');
        this.dataSource.data = this._appointments.filter(__ => 
          searchStrings.some(ss => __.client?.firstName.toLowerCase().includes(ss))
          || searchStrings.some(ss => __.client?.lastName.toLowerCase().includes(ss))
          || searchStrings.some(ss => __.technician?.firstName.toLowerCase().includes(ss))
          || searchStrings.some(ss => __.technician?.lastName.toLowerCase().includes(ss))
          || searchStrings.some(ss => __.getDisplayStatus().toLowerCase().includes(ss))
        );
      }
      this.afterAppointmentsChange();
    });

    this.filterControl.valueChanges.subscribe((_: AppointmentStatus[]) => {
      if (_.length < 1) {
        this.dataSource.data = this._appointments;
      } else {
        this.dataSource.data = this._appointments.filter(__ => _.includes(__.status));
      }
      this.afterAppointmentsChange();
    })
  }

  ngAfterViewInit(): void {
    this.setBtns({ add: true, view: true });

    if (!this.dataSource.paginator)
      this.dataSource.paginator = this.paginator;
  }

  @ViewChild('paginatorEle') 
  set matPaginator( paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @ViewChild(MatSort) 
  set matSort( sort: MatSort) {
    this.sort = sort;
  }

  get appointments(): Appointment[] {
    return this._appointments;
  }

  public setView = (view: 'calendar' | 'list'): void => {
    this.view = view;
    this.selected = [];
    
    this.setBtns({ add: true, view: true });
  }

  public onRowClick = (i: number): void => {
    if (this.selected.includes(i))
      this.selected = [];
      // this.selected = this.selected.filter(_ => _ !== i);
    else
      this.selected = [i];
      // this.selected.push(i);

    const selectedAppt = this._appointments[i];
    this.setBtns({ 
      add: true, 
      view: true, 
      cancel: this.selected.length > 0 && !selectedAppt.cancelled,
      update: this.selected.length === 1,
      updateStatus: this.selected.length === 1 && (!selectedAppt.completed[0] && !selectedAppt.cancelled)
    });
  }

  private setBtns = (btnIds: { add?: boolean, update?: boolean, cancel?: boolean, view?: boolean, updateStatus?: boolean }): void => {
    const newBtns: ButtonOptionsBase[] = [];
    if (btnIds.view)
      newBtns.push(new MenuButtonOptions('accent', this.viewMenu, 'visibility', 'Switch view of Appointments'));
    if (btnIds.add)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(), 'accent', 'add_circle_outline', 'Create Appointment'));
    if (btnIds.update)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(this._appointments[this.selected[0]]), 'accent', 'create', 'Update selected Appointment'));
    if (btnIds.cancel)
      newBtns.push(new IconButtonOptions(() => this.showCancelDiag(this._appointments[this.selected[0]]), 'accent', 'cancel', 'Cancel the selected Appointment'));
    if (btnIds.updateStatus)
      newBtns.push(new IconButtonOptions(() => this.showUpdateStatusDiag(this._appointments[this.selected[0]]), 'accent', 'update', 'Update the status of the selected Appointment'));

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
        this.dataSource.data = this._appointments;
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
          this.dataSource.data = this._appointments;
          this.afterAppointmentsChange();
          this.setStatuses();
        });
      }
    });
  }

  private showUpdateStatusDiag = (appt: Appointment): void => {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
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
        this.dataSource.data = this._appointments;
        this.afterAppointmentsChange();
        this.setStatuses();
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

  private reloadAppointments = (): void => {
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

  private setStatuses = (): void => {
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
    this.hasAppointments = (this.dataSource.data?.length > 0) || false;
    this.sortAppointments();
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
