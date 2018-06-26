/*const baseUrl: string = 'http://10.39.101.76:8888';
import {Http, Response } from '@angular/http';
export class  ServiceUrl {
  baseUrl: string;
  constructor(public http: Http) {
    // this.baseUrl = 'http://10.39.101.76:8888';
    this.init();
  }
  init() {
    this.http.request('http://10.39.104.39:8761/eureka/apps/CEVC').subscribe((res: Response) => {
      const data = res.json();
      const instance = data.application.instance[0];
      const hostName = instance.hostName;
      const port = instance.port.$;
      let ip = instance.ipAttr;
      ip = '10.39.201.43';
      this.baseUrl = 'http://' + ip + ':' + port + '/';
      console.log(this.baseUrl);
    },
    (error: string) => {
      console.log(error);
    });
  }
  getBaseUrl(): string {
    if (!this.hasOwnProperty('baseUrl')) {
      this.init();
    }
    console.log(this);
    console.log(this.baseUrl);
    return this.baseUrl;
  }
}*/
export const baseUrl = 'http://10.39.201.21:8888/';
