import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private host: string = 'localhost';
  private port: number = 3000;
  private entity: string = 'client';
  private baseUrl: string = `http://${this.host}:${this.port}/${this.entity}`;

  constructor(private http: HttpClient) { }

  getClients = (): Observable<Client[]> => {
    const url = this.baseUrl;
    return this.http.get<Client[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  createClient = (client: Client): Observable<boolean> => {
    const url = this.baseUrl;
    return this.http.post(url, client, { observe: "response" }).pipe(
      map(_ => {
        if (_.status > 200 && _.status < 300)
          return true;
        return false;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}