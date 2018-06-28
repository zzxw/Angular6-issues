import { Component, OnInit } from '@angular/core';
import {Options} from '../options';
import {IssuesService} from './issues.service';
import {TrendService} from '../trend/trend.service';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  service: IssuesService;
  trendService: TrendService;
  data: any;
  query: any;
  totalCount: number;
  totalPage: Array<Number>;
  condition: string;
  tabs: Array<string>;
  issues: Array<Object>;
  option: Options;
  subject: string;
  selected: boolean;
  isReg: boolean;
  isShow: boolean;
  icon: string;
  currentPage: number;
  dateRange: Array<Date>;
  projectName: string;
  projects: Array<string>;
  constructor(public http: Http) {
    this.service = new IssuesService(http);
    this.trendService = new TrendService(http);
    this.tabs = [];
    this.issues = [];
    this.query = {
      page: {
        currentPage: 1,
        size: 10
      },
      criteria: {
        search: {
          value: '',
          isRegexp: false
        },
        status: [],
        project: '',
        daterange: '' // 日期范围
      },
      order: {
        by: '',
        type: ''
      }
    };
  }

  ngOnInit() {
    this.getData(this.query);
    this.selected = false;
    this.isReg = false;
    this.currentPage = 1;
    this.isShow = false;
    this.icon = 'anticon anticon-down';
  }
  prev() {
    this.currentPage--;
    this.query.page.currentPage = this.currentPage;
    this.getData(this.query);
  }
  next() {
    this.currentPage++;
    this.query.page.currentPage = this.currentPage;
    this.getData(this.query);
  }
  getData(query: any) {
    const result = this.trendService.getProjects();
    result.subscribe((res: Response) => {
      const records = res.json();
      console.log(records);
      if (records['success']) {
        console.log(responseData);
        this.projects = responseData['records'];
        console.log(this.projects);
      }
    }, (err: string) => {
      console.log(err);
    });
    const responseData = this.service.init(query);
    console.log(responseData);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log('currentPage: ' + this.query.page.currentPage);
      this.currentPage = this.query.page.currentPage;
      this.data = item.records;
      this.totalCount = item.totalDBRecords;
      const n = Math.ceil(this.totalCount / this.query.page.size);
      // this.totalPage = [...(new Array(n)).keys()];
      this.totalPage = Array.from({ length: n }, (v, k) => k);
      this.totalPage.shift();
      console.log(this.data);
    }, (error: string) => {
      console.log(error);
    });
  }
  filter() {
    console.log(this.condition);
    this.currentPage = 1;
    this.query.page.currentPage = this.currentPage;
    this.query.criteria.search.value = this.condition;
    this.getData(this.query);
  }
  showDetails(obj: any) {
    console.log(obj);
    const no = obj.values[0];
    let tab = obj.values[1].trim() === '' ? obj.values[2].trim() : obj.values[1].trim();
    tab = tab.trim() === '' ? obj.values[3].trim() : tab;
    this.tabs.push(tab);
    console.log(this.tabs);
    const response = this.service.getDetails(no);
    response.subscribe((res: Response) => {
      const responseData = res.json();
      if (responseData.success) {
        this.issues.push(responseData.records);
        console.log(this.issues);
      }
    }, (err: string) => {
      console.log(err);
    });
    const doc = this.service.getDocs(no);
    doc.subscribe((res: Response) => {
      const docs = res.json();
    }, (err: string) => {
      console.log(err);
    });
  }
  showInfo(obj: Object) {
    console.log(obj);
  }
  closeTab(tab) {}
  newTab(tab) {}
  toggle() {
    this.isReg = this.isReg ? false : true;
  }
  clear() {}
  submit() {}
  show() {
    this.isShow = this.isShow ? false : true;
    this.icon = this.isShow ? 'anticon anticon-up' : 'anticon anticon-down';
  }
}
