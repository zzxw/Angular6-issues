import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class BaseServiceService {
  baseUrl: string;
  constructor(public http: Http) { }
  init() {
    this.http.request('http://10.39.104.39:8761/eureka/apps/CEVC').subscribe((res: Response) => {
      const data = res.json();
      const instance = data.application.instance[0];
      const hostName = instance.hostName;
      const port = instance.port.$;
      let ip = instance.ipAttr;
      // ip = '10.39.201.43';
      ip = '10.39.201.21';
      this.baseUrl = 'http://' + ip + ':' + port + '/';
      console.log(this.baseUrl);
    },
      (error: string) => {
        console.log(error);
      });
  }

  getBaseUrl(): string {
    this.init();
    return this.baseUrl;
  }
}
