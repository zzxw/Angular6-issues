import { Injectable } from '@angular/core';
import {baseUrl} from '../serviceUrl';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  url: string;
  constructor(public http: Http) { }
  getVersions(): Observable<any> {
    this.url = baseUrl + 'vc/versions';
    return this.http.get(this.url);
  }
  showList(version: string): Observable<any> {
    this.url = baseUrl + 'vc/version/' + version + '/issues';
    return this.http.get(this.url);
  }
  getData(version: string): Observable<any> {
    this.url = baseUrl + 'vc/version/' + version + '/sources';
    return this.http.get(this.url);
  }
}
