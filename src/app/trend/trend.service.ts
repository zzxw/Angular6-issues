import { Injectable } from '@angular/core';
import {baseUrl} from '../serviceUrl';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendService {
  url: string;
  constructor(public http: Http) { }
  getProjects(): Observable<any> {
    this.url = baseUrl + 'vc/projects';
    return this.http.get(this.url);
  }
  getTrendData(query: Object): Observable<any> {
    this.url = baseUrl + 'vc/count/days';
    return this.http.post(this.url, query);
  }
}
