import {Component, OnInit, Inject, Input} from '@angular/core';
import {IssuesTabService} from './issues-tab.service';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Options} from '../options';
import {st} from '@angular/core/src/render3';

@Component({
  selector: 'app-issues-tab',
  templateUrl: './issues-tab.component.html',
  styleUrls: ['./issues-tab.component.css']
})
export class IssuesTabComponent implements OnInit {
  issues: Array<Object>;
  service: IssuesTabService;
  @Input()map: Map<string, string>;
  title: string;
  isShow: boolean;
  icon: string;
  optionIns: Options;
  status: string;
  constructor(public http: Http) {
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
  showInfo() {}
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
    const doc = this.service.getDocs(this.map['no']);
    doc.subscribe((res: Response) => {
      const docs = res.json();
      console.log(docs);
    }, (err: string) => {
      console.log(err);
    });
  }
  tog() {
    this.isShow = this.isShow ? false : true;
    this.icon = this.isShow ? 'anticon anticon-down' : 'anticon anticon-right';
  }
}
