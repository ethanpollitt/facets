import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientDetailComponent } from 'src/app/client/detail/detail.component';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
  appt: Appointment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { appt: Appointment },
    public dialogRef: MatDialogRef<AppointmentDetailComponent>,
    private dialog: MatDialog
  ) {
    this.appt = data.appt;
  }

  ngOnInit(): void { }

  public close = (): void => {
    this.dialogRef.close(false);
  }

  public openClientDetails = (client: any) => {
    if (typeof client === 'string')
      return;

    
    const dialogRef = this.dialog.open(ClientDetailComponent, {
      data: { client: client },
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });    
  }
}
