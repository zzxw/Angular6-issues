import { Component, OnInit, Inject } from '@angular/core';
import {Http, Response} from '@angular/http';
import {CodeIssuesService} from './code-issues.service';

@Component({
  selector: 'app-code-issues',
  templateUrl: './code-issues.component.html',
  styleUrls: ['./code-issues.component.css']
})
export class CodeIssuesComponent implements OnInit {
  data: any;
  service: CodeIssuesService;
  list: Array<any>;
  count: number;
  maxCode: string;
  nextCode: string;
  // table test
  dataSet: Object;
  loading: boolean;
  total: number;
  pageIndex: number;
  pageSize: number;
  filterGender: Object;
  options: Array<Object>;
  selected: any;
  constructor(public http: Http) {
    this.service = new CodeIssuesService(this.http);
  }
  ngOnInit() {
    this.getData();
    this.options = [{
      value: 'zhejiang',
      label: 'Zhejiang'}];
  }
  myAddEvent(obj, event, func) {
    if (obj.attachEvent) {
      obj.attachEvent('on' + event, func);
    } else {
      obj.addEventListener(event, func, false);
    }
  }
  getData() {
    const responseData = this.service.test();
    console.log(responseData);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log(item);
      if (item.success) {
        this.data = item.records;
        console.log(this.data);
        // this.options = [];
       /* for (const i of this.data) {
          const name = i.values[1] + i.values[3];
          this.options.push({value: name, label: name});
        }
        console.log(this.options);*/
      }
    }, (error: string) => {
      console.log(error);
    });
  }
  getMaxCode(obj: any): void {
    const childs = obj.children;
    const no: string = childs[1].textContent;
    this.maxCode = '<none>';
    this.nextCode = no + '-1';
    const responseData = this.service.getMaxCode(no);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log(item);
      if (item.success) {
        if (item.records[0].values[0].trim() !== '') {
          this.maxCode = item.records[0].values[0];
          const codes = this.maxCode.split('-');
          const last = codes[codes.length - 1];
          const next = (parseInt(last, 0) + 1) + '';
          codes[codes.length - 1] = next;
          this.nextCode = codes.join('-');
        }
      }
      childs[3].innerText = this.maxCode;
      childs[4].innerText = this.nextCode;
    }, (error: string) => {
      console.log(error);
    });
  }
  showList(no: any): void {
    if (no == null || typeof(no) === 'undefined') {
      return;
    }
    console.log(no);
    this.loading = true;
    const responseData = this.service.showList(no);
    console.log(responseData);
    responseData.subscribe((res: Response) => {
      const item = res.json();
      console.log(item);
      if (item.success) {
        this.list = item.records;
        this.count = this.list[0].values[0];
        this.total = item.recordCount;
        console.log(this.list);
        this.loading = false;
      }
    }, (err: string) => {
      console.log(err);
      this.loading = false;
    });
    /*const tr = document.getElementsByTagName('tr');
    console.log(tr.length);
    for (let i = 0; i < tr.length; i++) {
      this.myAddEvent(tr[i], 'click', this.getMaxCode);
    }*/
  }
  searchData() {}
  sort($event) {}
  updateFilter($event) {}
}
