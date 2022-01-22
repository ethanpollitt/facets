import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { Client } from 'src/app/client/client.model';
import { Technician } from 'src/app/technician/technician.model';
import { ClientService } from 'src/app/client/client.service';
import { TechnicianService } from 'src/app/technician/technician.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateAppointmentComponent implements OnInit {
  public clients: Client[] = [];
  public technicians: Technician[] = [];

  readonly hours: number[];
  readonly minutes: number[];

  private dateFmt: DatePipe = new DatePipe('en-US');

  currentAppointment: Appointment;
  form: FormGroup = new FormGroup({
    client: new FormControl(null, [Validators.required]),
    technician: new FormControl(null),
    date: new FormControl(null, [Validators.required]),
    windowHours: new FormControl(null, [Validators.required, Validators.max(23)]),
    // windowMinutes: new FormControl(null, [Validators.required, Validators.max(59)]),
    customerNotes: new FormControl(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment },
    public dialogRef: MatDialogRef<CreateUpdateAppointmentComponent>,
    private appointmentService: AppointmentService,
    private clientService: ClientService,
    private techService: TechnicianService,
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
    if (this.data && this.data.appointment) {
      this.currentAppointment = this.data.appointment;
      Object.keys(this.form.controls).forEach((_: string) => {
        switch (_) {
          case "windowHours":
            this.form.controls[_].setValue(Math.floor(+this.currentAppointment.windowLength / 60));
            break;
          case "technician":
          case "client":
            this.form.controls[_].setValue(this.currentAppointment[_]['_id']);
            break;
          case "date":
            this.form.controls[_].setValue(this.dateFmt.transform(this.currentAppointment[_], 'yyyy-MM-ddTHH:mm:ss'));
            break;
          default:
            this.form.controls[_]?.setValue(this.currentAppointment[_]);
        }
      });
    }

    this.clientService.getClients().subscribe(_ => {
      this.clients = _;
    }, _ => {
      // TODO: finish error modal + service & open here
      console.error(_);
    });

    this.techService.getTechnicians().subscribe(_ => {
      this.technicians = _;
    }, _ => {
      // TODO: finish error modal + service & open here
      console.error(_);
    })
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

  stopEvent = ($event: Event): void => {
    $event.preventDefault();
    $event.stopPropagation();
  }

  private create = (): void => {
    const formObj = this.form.getRawValue();
    formObj['windowLength'] = +formObj['windowHours'] * 60;  // TODO: Add back minutes here when re-implementing
    const appt: Appointment = new Appointment(formObj);

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
    const formObj = this.form.getRawValue();
    formObj['windowLength'] = +formObj['windowHours'] * 60;  // TODO: Add back minutes here when re-implementing
    const appt: Appointment = new Appointment(formObj);

    // Compare the clients, return if equal
    if (appt.isEqual(this.currentAppointment))
      return;

    // Set ID on new client object & send
    appt.id = this.currentAppointment.id;
    this.appointmentService.updateAppointment(appt).subscribe(_ => {
      if (_) {
        this.snackBar.open(`Appointment ${this.currentAppointment.id} updated!`, null, { duration: 5000, horizontalPosition: 'end' });
        this.dialogRef.close(new Appointment(_));
      } else
        this.snackBar.open(`Updating Appointment ${this.currentAppointment.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    }, _ => {
      this.snackBar.open(`Updating Appointment ${this.currentAppointment.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    });
  }
}
