import { Injectable } from '@angular/core';
import {baseUrl} from '../serviceUrl';
import {Observable} from 'rxjs';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  url: string;
  constructor(public http: Http) { }
  init(query: any): Observable<any> {
    this.url = baseUrl + 'vc/search';
    return this.http.post(this.url, query);
  }
  getDetails(no: string): Observable<any> {
    this.url = baseUrl + 'vc/issue/' + no;
    return this.http.get(this.url);
  }
  getDocs(no: string): Observable<any> {
    this.url = baseUrl + 'vc/docs/' + no;
    return this.http.get(this.url);
  }
}
