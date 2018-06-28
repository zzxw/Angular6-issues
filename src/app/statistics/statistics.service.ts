import { Injectable } from '@angular/core';
import {baseUrl} from '../serviceUrl';
import {Observable} from 'rxjs';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  url: string;
  query: any;
  constructor(public http: Http) {
    /*this.query = {
      page: { currentPage: 1, size: 0 }, criteria: { project: '', daterange: [] }, order: { by: '', type: '' }
    };*/
  }
  getData(query: Object): Observable<any> {
    this.url = baseUrl + 'vc/count/projects';
    return this.http.post(this.url, query);
  }
}
