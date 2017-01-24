import { Injectable } from '@angular/core';
import {Workspace } from '../classes/workspace'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManipulatorService {

    private baseUrl = 'http://localhost:3000/api/workspace/';
    constructor(private http: Http) { }

      getAllwSpaces(): Observable<Workspace[]> {
          return this.http.get('http://localhost:3000/api/workspace')
              .map(res => res.json());
      }

      getWspace(dateTime): Observable<Workspace> {
          return this.http.get(this.baseUrl + encodeURI(dateTime))
              .map(res => res.json());
      }

      updateWspace(wspace: Workspace) {
          return this.http.put(this.baseUrl + encodeURI(wspace.dateCreated), wspace)
              .map(res => res.json());
      }

      deleteWspace(wspace: Workspace) {
          return this.http.delete(this.baseUrl + encodeURI(wspace.dateCreated))
              .map(res => res.json());
      }



      public extractData(res: Response) {
          let body = res.json();
          return body.data || {};
      }
      private handleError(error: Response | any) {
          // In a real world app, we might use a remote logging infrastructure
          let errMsg: string;
          if (error instanceof Response) {
              const body = error.json() || '';
              const err = body.error || JSON.stringify(body);
              errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          } else {
              errMsg = error.message ? error.message : error.toString();
          }
          console.error(errMsg);
          return Observable.throw(errMsg);
      }

}
