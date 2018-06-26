import { Injectable, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import {baseUrl} from '../serviceUrl';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeIssuesService {
  baseUrl: string;
  constructor(public http: Http) {
    this.baseUrl = baseUrl;
    console.log(this.baseUrl);
  }
  getList() {
    let data: any = {};
    const url = this.baseUrl + 'vc/categories';
    console.log(url);
    this.http.request(url).subscribe((res: Response) => {
      data = res.json();
      console.log(data);

      console.log('observable :2');
      return data;
    }, (error: string) => {
      console.log(error);
    });
    return {b: 2};
  }
  test(): Observable<any> {
    const url = this.baseUrl + 'vc/categories';
    return this.http.get(url);
  }
  showList(no: number): Observable<any> {
    const url = this.baseUrl + 'vc/category/' + no + '/list';
    return this.http.get(url);
  }
  getMaxCode(no: string): Observable<any> {
    const url = this.baseUrl + 'vc/subcategory/' + no + '/maxcode';
    return this.http.get(url);
  }
}
