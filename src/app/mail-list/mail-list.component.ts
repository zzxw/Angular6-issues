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
  dateRange: Array<Date>;
  options: Options;
  subject: string;
  status: string;
  option: Array<Object>;
  isShow: boolean;
  icon: string;
  constructor(public http: Http, public sanitizer: DomSanitizer) {
    this.service = new MailService(http);
    this.options = new Options();
  }

  ngOnInit() {


    query.page.currentPage = 1;
    this.getData(query);
    // MailListComponent.showCal();
    const mailOptions = this.options.getOptions('mail_status');
    this.option = [];
    for (const i in mailOptions) {
      if (mailOptions.hasOwnProperty(i)) {
        this.option.push({value: i, key: mailOptions[i]});
      }
    }
    console.log(this.option);
    this.isShow = false;
    this.icon = 'anticon anticon-caret-down';
  }
  submit(obj) {
    const range: Array<string> = [];
    console.log(this.dateRange);
    if (typeof(this.dateRange) !== 'undefined' && this.dateRange.length !== 0) {
      range.push(this.dateRange[0].toISOString());
      range.push(this.dateRange[1].toISOString());
    }
    query.criteria.daterange = range;
    if (this.subject == null || typeof(this.subject) === 'undefined') {
      this.subject = '';
    }
    query.criteria.subject = this.subject.trim();
    if (this.status == null && typeof(this.status) === 'undefined') {
      this.status = '';
    }
    query.criteria.status = this.status;
    this.getData(query);
  }
  clear() {
    this.subject = '';
    this.status = '';
    this.dateRange = [];
    this.getData(query);
  }
  getData(condition: any): void {
    const responseData = this.service.getData(condition);
    console.log(responseData);
    this.currentPage = condition.page.currentPage;
    console.log('currentPageNo:' + condition.page.currentPage);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log(item);
      this.records = item.totalDBRecords;
      this.data = item.records;
    }, (error: string) => {
      console.log(error);
    });
  }
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
  toggle() {
    this.isShow = this.isShow ? false : true;
    this.icon = this.isShow ? 'anticon anticon-caret-up' : 'anticon anticon-caret-down';
  }
}
