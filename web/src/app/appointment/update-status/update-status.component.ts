import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment, AppointmentStatus } from '../appointment.model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent {
  appt: Appointment;
  statusControl: FormControl = new FormControl();
  postNotes: FormControl = new FormControl();
  statuses: string[] = [];
  currentStatus: string;
  apptStatuses = AppointmentStatus;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment },
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    private appointmentService: AppointmentService
  ) {
    this.appt = data.appointment;
    
    if (this.appt.started[0])
      this.statuses.push(AppointmentStatus.COMPLETED);
    else if (this.appt.routed[0])
      this.statuses.push(AppointmentStatus.STARTED, AppointmentStatus.COMPLETED);
    else    
      this.statuses.push(AppointmentStatus.ROUTED, AppointmentStatus.STARTED, AppointmentStatus.COMPLETED);

    this.statusControl.statusChanges.subscribe(_ => {
      this.currentStatus = this.statusControl.value;
    });
  }

  public apply = (): void => {
    // Set new appointment status
    if (this.currentStatus === AppointmentStatus.ROUTED) 
      this.appt.routed = [true, new Date()];
    else if (this.currentStatus === AppointmentStatus.STARTED)
      this.appt.started = [true, new Date()];
    else if (this.currentStatus === AppointmentStatus.COMPLETED)
      this.appt.completed = [true, new Date()];

    // Set appointment post notes
    if (![null, undefined].includes(this.postNotes.value))
      this.appt.postNotes = this.postNotes.value;

    this.appointmentService.updateAppointment(this.appt).subscribe(_ => {
      this.dialogRef.close(_);
    });
  }

  public close = (): void => {
    this.dialogRef.close(false);
  }
}
