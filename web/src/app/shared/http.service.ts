import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { throwError } from 'rxjs';

@Injectable()
export class HttpService {
  private _host: string = window.location.hostname;
  private _port: number = 3000;
  private _entity: string;
  protected baseUrl: string;

  constructor(
    protected http: HttpClient,
    private e: string
  ) {
    this._entity = e;
    this.baseUrl = `http://${this._host}:${this._port}/${this.entity}`;
  }

  public get entity() {
    return this._entity;
  }
  
  protected handleError(error: HttpErrorResponse) {
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