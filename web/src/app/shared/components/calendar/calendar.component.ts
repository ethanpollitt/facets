import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/appointment/appointment.model';
import { AppointmentDetailComponent } from 'src/app/appointment/detail/detail.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  beginFiller: number[];
  endFiller: number[];
  days: number[] ;
  firstDay: number;
  lastDay: number;
  calendarDateStr: string;
  currentMonthAppointments: Map<number, Appointment[]> = new Map();
  hasAppointments: boolean = false;

  private currentDate: Date;
  private currentMonth: number;
  private startOfMonth: Date;
  private endOfMonth: Date;
  private _appointments: Appointment[];

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    let today = new Date();
    this.setMonth(today);
  }

  ngOnInit(): void { }

  @Input()
  set appointments(appt: Appointment[]) {
    this._appointments = appt;
    if (Array.isArray(this._appointments)  && this._appointments.length > 0)
      this.setCurrentMonthAppointments();
  }

  get appointments() {
    return this._appointments;
  }

  public setCurrentMonthAppointments = (): void => {
    this.hasAppointments = true;
    this.currentMonthAppointments = new Map<number, Appointment[]>();
    
    this._appointments.filter(_ => {
        return _.date.getTime() >= this.startOfMonth.getTime() && _.date.getTime() <= this.endOfMonth.getTime();
      }).forEach(_ => {
        let day: number = _.date.getDate();
        if (this.currentMonthAppointments.has(day))
          this.currentMonthAppointments.get(day).push(_);
        else
          this.currentMonthAppointments.set(day, [_]);
      });

      console.log(this.currentMonthAppointments);
  }

  public openAppointment = (appt: Appointment): void => {
    const dialogRef = this.dialog.open(AppointmentDetailComponent, {
      data: { appt: appt },
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The detail dialog was closed`);
    });
  }

  public nextMonth = (): void => {
    this.currentDate.setMonth(this.currentMonth + 1);
    this.setMonth(this.currentDate);
    this.setCurrentMonthAppointments();
  }

  public prevMonth = (): void => {
    this.currentDate.setMonth(this.currentMonth - 1);
    this.setMonth(this.currentDate);
    this.setCurrentMonthAppointments();
  }

  private setMonth(date: Date) {
    this.currentDate = date;
    this.calendarDateStr = this.datePipe.transform(date, 'LLLL YYYY')
    this.currentMonth = date.getMonth();
    this.startOfMonth = (new Date(date.getFullYear(), this.currentMonth));
    this.firstDay = this.startOfMonth.getDay();
    this.lastDay = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
    this.endOfMonth = new Date(date.getFullYear(), date.getMonth(), this.lastDay + 1);
    this.beginFiller = [...Array(this.firstDay == 1 ? 1 : this.firstDay).keys()];
    this.endFiller = [...Array(34 - this.lastDay).keys()];
    this.days = [...Array(this.lastDay).keys()];
  }
}
