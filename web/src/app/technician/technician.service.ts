import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../shared/http.service';
import { Technician } from './technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService extends HttpService {
  constructor(protected http: HttpClient) {
    super(http, 'technicians');
  }

  getTechnicians = (): Observable<Technician[]> => {
    const url = this.baseUrl;
    return this.http.get<Technician[]>(url, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300) {
          try {
            const technicians: Technician[] = [];
            _.body.forEach(_ => {
              technicians.push(new Technician(_));
            });
            return technicians;
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

  createTechnician = (technician: Technician): Observable<Technician> => {
    const url = this.baseUrl;
    return this.http.post(url, technician, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Technician(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  updateTechnician = (technician: Technician): Observable<Technician> => {
    let url = this.baseUrl;
    if ('id' in technician && !!technician.id)
      url += `/${technician.id}`;
    else
      return throwError('ID required to update a Technician!');
    return this.http.put(url, technician, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Technician(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  deleteTechnician = (id: number): Observable<boolean> => {
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