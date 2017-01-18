import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { JsonCanvas} from './Classes/json-canvas'

@Injectable()
export class DesignerService {

  constructor(private http: Http) { }

  getAllDesigns() {
    return this.http.get('http://localhost:3000/api/designs')
      .map(res => res.json());
  }
    getDesigns():Observable<JsonCanvas[]>{
        return this.http.get('http://localhost:3000/api/designs')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: Response | any) {
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
