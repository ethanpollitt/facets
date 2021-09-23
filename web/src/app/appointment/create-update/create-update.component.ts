import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { Client } from 'src/app/client/client.model';
import { Technician } from 'src/app/technician/technician.model';
import { range } from 'rxjs';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateAppointmentComponent implements OnInit {
  private _clients: Client[];
  private _technicians: Technician[];

  readonly hours: number[];
  readonly minutes: number[];

  currentAppointment: Appointment;
  form: FormGroup = new FormGroup({
    client: new FormControl(null, [Validators.required]),
    technician: new FormControl(null),
    date: new FormControl(null, [Validators.required]),
    windowMinutes: new FormControl(null, [Validators.required, Validators.max(59)]),
    windowHours: new FormControl(null, [Validators.required, Validators.max(23)]),
    customerNotes: new FormControl(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { client: Appointment },
    public dialogRef: MatDialogRef<CreateUpdateAppointmentComponent>,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {
    // Populate hours in increments of 1
    this.hours = [];
    for (let i = 1; i < 13; i++) {
      this.hours.push(i);
    }

    // Populate minutes in increments of 5 (starting at 0)
    this.minutes = [0];
    for (let i = 30; i < 60; i += 5) {
      this.minutes.push(i);
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.client) {
      this.currentAppointment = this.data.client;
      Object.keys(this.form.controls).forEach(_ => this.form.controls[_].setValue(this.currentAppointment[_]));
    }
  }

  get clients() {
    return this._clients;
  }

  get technicians() {
    return this._technicians;
  }

  submit = (): void => {
    if (this.currentAppointment)
      this.update();
    else
      this.create();
  }

  close = (): void => {
    this.dialogRef.close(false);
  }

  private create = (): void => {    
    const appt: Appointment = new Appointment(this.form.getRawValue());

    this.appointmentService.createAppointment(appt).subscribe(_ => {
      if (_) {
        this.snackBar.open('Appointment created!', null, { duration: 5000, horizontalPosition: 'end' });
        this.dialogRef.close(_);
      } else
        this.snackBar.open('Creation of new Appointment failed!', null, { duration: 10000, horizontalPosition: 'end' });
    }, _ => {
      this.snackBar.open('Creation of new Appointment failed!', null, { duration: 10000, horizontalPosition: 'end' });
    });
  }

  private update = (): void => {
    const appt: Appointment = new Appointment(this.form.getRawValue());

    // Compare the clients, return if equal
    if (appt.isEqual(this.currentAppointment))
      return;

    // Set ID on new client object & send
    appt.id = this.currentAppointment.id;
    this.appointmentService.updateAppointment(appt).subscribe(_ => {
      if (_) {
        this.snackBar.open(`Appointment ${this.currentAppointment.id} updated!`, null, { duration: 5000, horizontalPosition: 'end' });
        this.dialogRef.close(_);
      } else
        this.snackBar.open(`Updating Appointment ${this.currentAppointment.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    }, _ => {
      this.snackBar.open(`Updating Appointment ${this.currentAppointment.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    });
  }
}
