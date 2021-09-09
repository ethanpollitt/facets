import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpService } from '../shared/http.service';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends HttpService {
  constructor(protected http: HttpClient) {
    super(http, 'appointments');
  }

  getAppointments = (): Observable<Appointment[]> => {
    const url = this.baseUrl;
    return this.http.get<Appointment[]>(url, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300) {
          try {
            const appointments: Appointment[] = [];
            _.body.forEach(_ => {
              appointments.push(new Appointment(_));
            });
            return appointments;
          } catch(e) {
            console.error(e);
          }
          return _.body;
        }
        return null;
      }),
      catchError(this.handleError)
    );
  }

  createAppointment = (appointment: Appointment): Observable<Appointment> => {
    const url = this.baseUrl;
    return this.http.post(url, appointment, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Appointment(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  updateAppointment = (appointment: Appointment): Observable<Appointment> => {
    let url = this.baseUrl;
    if ('id' in appointment && !!appointment.id)
      url += `/${appointment.id}`;
    else
      return throwError('ID required to update a Appointment!');
    return this.http.put(url, appointment, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Appointment(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  deleteAppointment = (id: number): Observable<boolean> => {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return true;
        return false;
      }),
      catchError(this.handleError)
    );
  }
}
