import { Component, OnInit } from '@angular/core';
import {query} from '../query';
import {Http, Response} from '@angular/http';
import {MailService} from './mail.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Options} from '../options';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {
  service: MailService;
  data: any;
  totalPage: number;
  records: number;
  iFrame: SafeResourceUrl;
  currentPage: number;
  dateRange: string;
  keys: Array<string>;
  values: Array<string>;
  options: Options;
  subject: string;
  constructor(public http: Http, public sanitizer: DomSanitizer) {
    this.service = new MailService(http);
    this.options = new Options();
    this.keys = [];
    this.values = [];
  }

  ngOnInit() {
    /*let form = new FormControl();
    this.formValue = form.value;
    form.valueChanges.subscribe(
      (value: string) => {
        console.log("form", value);
      }
    );*/

    query.page.currentPage = 1;
    this.getData(query);
    // MailListComponent.showCal();
    const option = this.options.getOptions('mail_status');
    for (let i in option) {
      this.keys.push(i);
      this.values.push(option[i]);
    }
    console.log(this.keys);
    console.log(this.values);
  }
  test(str) {
    console.log(str);
    const date = this.dateRange;
    console.log(date);
  }
  submit() {
    this.dateRange = (document.getElementById("time") as any).value;
    console.log(this.dateRange);
    let range: Array<string> = [];
    if (this.dateRange.trim() !== '') {
      const dates = this.dateRange.split(' ');
      const startTime = new Date(Date.parse(dates[0].replace(/-/g,  "/")));
      const endTime = new Date(Date.parse(dates[2].replace(/-/g,  "/")));
      range.push(startTime.toISOString());
      range.push(endTime.toISOString());
    }
    console.log(range);
    query.criteria.daterange = range;
    query.criteria.subject = this.subject.trim();
    console.log(query);
    this.getData(query);
  }
  clear() {
    this.subject = '';

  }
  /*static change(str) {
    console.log(str);
  }*/
  getData(query: any): void {
    const responseData = this.service.getData(query);
    console.log(responseData);
    this.currentPage = query.page.currentPage;
    console.log('currentPageNo:' + query.page.currentPage);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log(item);
      this.records = item.totalDBRecords;
      this.data = item.records;
    }, (error: string) => {
      console.log(error);
    });
  }
  /*static showCal() {
    laydate.render({
      elem: '#time',
      theme: '#0c6acf',
      range: true
    });
    console.log(laydate);
  }*/
  showDetail(item) {
    const no = item.values[0];
    const url = 'http://10.39.201.21:8888/' + 'vc/mail/' + no;
    // console.log(this.mailDetail);
    this.iFrame = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(this.iFrame);
    /*const responseData = this.service.showDetails(no);
    console.log(responseData);
    responseData.subscribe((res: Response) => {
      console.log(res);
      this.mailDetail = res;
    }, (error: string) => {
      console.log(error);
    });*/
  }
  prevPage() {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    query.page.currentPage = this.currentPage;
    console.log(query);
    this.getData(query);
  }
  nextPage() {
    if (this.currentPage === this.totalPage) {
      return;
    }
    this.currentPage++;
    query.page.currentPage = this.currentPage;
    console.log(query);
    this.getData(query);
  }

}
