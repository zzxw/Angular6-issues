import {Component, OnInit, Input} from '@angular/core';
import {IssuesTabService} from './issues-tab.service';
import {Http, Response} from '@angular/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Options} from '../options';
import {baseUrl} from '../serviceUrl';

@Component({
  selector: 'app-issues-tab',
  templateUrl: './issues-tab.component.html',
  styleUrls: ['./issues-tab.component.css']
})
export class IssuesTabComponent implements OnInit {
  iFrame: SafeResourceUrl;
  issues: Array<Object>;
  service: IssuesTabService;
  @Input()map: Map<string, string>;
  title: string;
  isShow: boolean;
  icon: string;
  optionIns: Options;
  status: string;
  docsData: Array<any>;
  docUrl: string;
  constructor(public http: Http, public sanitizer: DomSanitizer) {
    this.service = new IssuesTabService(this.http);
    this.optionIns = new Options();
  }
  ngOnInit() {
    this.title = this.map['title'];
    this.show();
    this.icon = 'anticon anticon-right';
    this.isShow = false;
    this.status = this.map['status'];
  }
  showInfo(item) {
    console.log(item);
    const no = item.values[0];
    console.log(no);
    const url = baseUrl + 'vc/issuelog/' + no;
    this.iFrame = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(this.iFrame);
  }
  show() {
    const response = this.service.getDetails(this.map['no']);
    response.subscribe((res: Response) => {
      const responseData = res.json();
      if (responseData.success) {
        this.issues = responseData.records;
        console.log(this.issues);
      }
    }, (err: string) => {
      console.log(err);
    });
    if (typeof(this.docUrl) === 'undefined') {
      this.docUrl = baseUrl + 'vc/download/';
    }
    const doc = this.service.getDocs(this.map['no']);
    doc.subscribe((res: Response) => {
      const docs = res.json();
      console.log(docs);
      this.docsData = docs.records;
      console.log(this.docsData);
    }, (err: string) => {
      console.log(err);
    });
  }
}
