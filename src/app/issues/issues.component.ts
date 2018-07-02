import { Component, OnInit } from '@angular/core';
import {Options} from '../options';
import {IssuesService} from './issues.service';
import {TrendService} from '../trend/trend.service';
import {Http, Response} from '@angular/http';
import {st} from '@angular/core/src/render3';
import {Range} from '../range';

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
  loading: boolean;
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
  priority: any;
  projects: Array<string>;
  keys: string[];
  map: Object = {};
  statusMap: Object = {};
  status: string[];
  pageIndex: Number;
  pageSize: Number;
  issueOption: Object;
  ranges: Object;
  range: Range;
  constructor(public http: Http) {
    this.service = new IssuesService(http);
    this.trendService = new TrendService(http);
    this.range = new Range();
    this.ranges = {};
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
    this.option = new Options();
  }
  ngOnInit() {
    this.getData(this.query);
    this.selected = false;
    this.isReg = false;
    this.currentPage = 1;
    this.isShow = false;
    this.ranges = this.range.getDateRange();
    this.icon = 'anticon anticon-down';
    this.pageSize = 10;
    const issuesOption = this.option.getOptions('issue_status');
    this.keys = [];
    for (const i in issuesOption) {
      if (issuesOption.hasOwnProperty(i)) {
        this.statusMap[issuesOption[i]] = i;
        this.keys.push(issuesOption[i]);
      }
    }
    console.log(this.statusMap);
    const result = this.trendService.getProjects();
    result.subscribe((res: Response) => {
      const records = res.json();
      console.log(records);
      if (records['success']) {
        console.log(records);
        this.projects = records['records'];
        console.log(this.projects);
      }
    }, (err: string) => {
      console.log(err);
    });
    this.issueOption = this.option.getOptions('issue_status');
    console.log(this.issueOption);
    this.priority = this.option.getOptions('priority');
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
    let tab = obj.values[1].trim() === '' ? obj.values[2].trim() : obj.values[1].trim();
    tab = tab.trim() === '' ? obj.values[3].trim() : tab;
    if (this.tabs.includes(tab)) {
      return;
    }
    console.log(obj);
    const no = obj.values[0];
    const title = obj.values[4];
    this.map['no'] = no;
    this.map['title'] = title;
    this.map['status'] = obj.values[11];
    console.log(this.map);
    this.tabs.push(tab);
    console.log(this.tabs);
    /*const response = this.service.getDetails(no);
    response.subscribe((res: Response) => {
      const responseData = res.json();
      if (responseData.success) {
        this.issues = responseData.records;
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
    });*/
  }
  showInfo(obj: Object) {
    console.log(obj);
  }
  closeTab(tab) {
    const arr: string[] = [];
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] !== tab) {
        arr.push(this.tabs[i]);
      }
    }
    this.tabs = arr;
  }
  newTab(tab) {}
  toggle() {
    this.isReg = this.isReg ? false : true;
    if (this.query.criteria.search.value !== '') {
      this.query.criteria.search.isRegexp = this.isReg;
    }
  }
  changePage($event) {
    console.log($event);
    this.query.page.currentPage = this.currentPage;
    this.getData(this.query);
  }
  changePageSize() {
    console.log(this.pageSize);
    this.query.page.size = this.pageSize;
    this.getData(this.query);
  }
  clear() {
    this.isReg = false;
    this.projectName = '';
    this.subject = '';
    this.dateRange = [];
    this.status = [];
    this.query.criteria.search = {value: '', isRegexp: false};
    this.query.criteria.daterange = '';
    this.query.criteria.project = this.projectName;
    this.getData(this.query);
  }
  sort(sort: { key: string, value: string }): void {
    if (sort.value == null) {
      this.query.order.by = '';
      this.query.order.type = '';
    } else {
      const sortName = sort.key;
      const sortValue = sort.value;
      this.query.order.by = sortName;
      this.query.order.type = sortValue;
    }
    this.getData(this.query);
  }
  searchData($event) {}
  submit() {
    console.log(this.query);
    this.getData(this.query);
  }
  show() {
    this.isShow = this.isShow ? false : true;
    this.icon = this.isShow ? 'anticon anticon-up' : 'anticon anticon-down';
  }
  projectChange($event) {
    console.log($event);
    const tmp = $event == null ? '' : $event;
    this.query.criteria.project = tmp;
    this.getData(this.query);
  }
  statusChagne($event) {
    console.log($event);
    const tmp = $event == null ? [] : $event;
    this.query.criteria.status = tmp;
    this.getData(this.query);
  }
  dateRangeChange($event) {
    console.log($event);
    const tmp = $event == null ? [] : $event;
    this.query.criteria.daterange = tmp;
    this.getData(this.query);
  }
  subjectChange($event) {
    console.log($event);
    if ($event == null) {
      this.query.criteria.search = {};
    } else {
      this.query.criteria.search.value = $event;
      this.query.criteria.search.isRegexp = this.isReg;
    }
  }
}
