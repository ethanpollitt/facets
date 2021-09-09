import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from '../app.service';
import { IconButtonOptions, ToolbarOptions } from '../nav/toolbar/toolbar.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { Device } from '../shared/models/device';
import { Appointment, AppointmentStatus } from './appointment.model';
import { AppointmentService } from './appointment.service';

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
  dataSource: MatTableDataSource<Appointment>;
  
  private appointments: Appointment[];
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
      this.appointments = _;
      this.hasAppointments = this.appointments.length > 0;
      this.dataSource = new MatTableDataSource<Appointment>(this.appointments);

      this.setStatuses();

      s.unsubscribe();
    });
  }

  public onRowClick = (i: number): void => {
    if (this.selected.includes(i))
      this.selected = [];
      // this.selected = this.selected.filter(_ => _ !== i);
    else
      this.selected = [i];
      // this.selected.push(i);

    this.setBtns({ add: true, detail: this.selected.length > 0, delete: this.selected.length > 0, update: this.selected.length === 1 });
  }

  private setBtns = (btnIds: { add?: boolean, update?: boolean, delete?: boolean, detail?: boolean }): void => {
    const newBtns: IconButtonOptions[] = [];
    // if (btnIds.add)
    //   newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(), 'accent', 'add_circle_outline', 'Add new Client'));
    // if (btnIds.detail)
    //   newBtns.push(new IconButtonOptions(() => this.showDetailDiag(this.clients[this.selected[0]]), 'accent', 'description', `Show details on selected Client`));
    // if (btnIds.update)
    //   newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(this.clients[this.selected[0]]), 'accent', 'create', 'Update selected Client'));
    // if (btnIds.delete)
    //   newBtns.push(new IconButtonOptions(() => this.showDeleteDiag(this.clients[this.selected[0]]), 'accent', 'delete_outline', `Delete selected Client${this.selected.length > 1 ? 's' : ''}`));

    const options: ToolbarOptions = {
      title: 'Appointments',
      buttons: newBtns
    };
    this.toolbarService.setOptions(options);
  }

  private setStatuses = () => {
    this.statuses = new Map<number, { status: AppointmentStatus, date: Date, display: string }>();
    this.appointments.forEach(_ => {
      let status, date;
      if (_.cancelled)
        status = AppointmentStatus.CANCELED;
      else if (_.routed[0]) {
        status = AppointmentStatus.ROUTED;
        date = _.routed[1];
      } else if (_.started[0]) {
        status = AppointmentStatus.STARTED;
        date = _.started[1];
      } else if (_.completed[0]) {
        status = AppointmentStatus.COMPLETED;
        date = _.completed[1];
      } else
        status = AppointmentStatus.PENDING;
      this.statuses.set(_.id, { status: status, date: date, display: date ? `${status} (${date})` : status });
    });
  }

  private setDisplayedFields = (): void => {
    if (this.device.isDesktop)
      this.displayedFields = this.allFields.map(_ => _);
    else if (this.device.isTablet)
      this.displayedFields = this.tabletFields.map(_ => _);
    else
      this.displayedFields = this.mobileFields.map(_ => _);
  }
}
