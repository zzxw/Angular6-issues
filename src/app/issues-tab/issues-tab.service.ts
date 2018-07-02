import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {baseUrl} from '../serviceUrl';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesTabService {
  url: string;
  constructor(public http: Http) { }
  getDetails(no: string): Observable<any> {
    this.url = baseUrl + 'vc/issue/' + no;
    return this.http.get(this.url);
  }
  getDocs(no: string): Observable<any> {
    this.url = baseUrl + 'vc/docs/' + no;
    return this.http.get(this.url);
  }
  getIssueLog(no: string): Observable<any> {
    this.url = baseUrl + 'vc/issuelog/' + no;
    return this.http.get(this.url);
  }
}
