import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DesignerService {

  constructor(private http: Http) { }

  getAllDesigns() {
    return this.http.get('/api/designs')
      .map(res => res.json());
  }


}
