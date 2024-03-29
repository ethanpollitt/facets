import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from './client.model';
import { HttpService } from '../shared/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HttpService {
  constructor(protected http: HttpClient) {
    super(http, 'clients');
  }

  getClients = (): Observable<Client[]> => {
    const url = this.baseUrl;
    return this.http.get<Client[]>(url, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300) {
          try {
            const clients: Client[] = [];
            _.body.forEach(_ => {
              clients.push(new Client(_));
            });
            return clients;
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

  createClient = (client: Client): Observable<Client> => {
    const url = this.baseUrl;
    return this.http.post(url, client, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Client(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  updateClient = (client: Client): Observable<Client> => {
    let url = this.baseUrl;
    if ('id' in client && !!client.id)
      url += `/${client.id}`;
    else
      return throwError('ID required to update a Client!');
    return this.http.put(url, client, { observe: "response" }).pipe(
      map(_ => {
        if (_.status >= 200 && _.status < 300)
          return new Client(_.body as any);
        return null;
      }),
      catchError(this.handleError)
    );
  }

  deleteClient = (id: number): Observable<boolean> => {
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
