import { Component, OnInit } from '@angular/core';
import {TrendService} from './trend.service';
import {Http, Response} from '@angular/http';
import * as echarts from 'echarts';
import {Range} from '../range';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {
  service: TrendService;
  projects: Array<string>;
  xList: Array<number>;
  yList: Array<number>;
  query: Object;
  project: string;
  dateRange: Array<Date>;
  option: Object;
  myChart: Object;
  range: Range;
  ranges: Object;
  constructor(public http: Http) {
    this.service = new TrendService(this.http);
    this.range = new Range();
    this.ranges = {};
  }
  ngOnInit() {
    this.query = {
      page: { currentPage: 1, size: 0 }, criteria: { project: '', daterange: [] }, order: { by: '', type: '' }
    };
    this.ranges = this.range.getDateRange();
    this.option = {
      title: {
        text: '一线报告问题',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333333'
        }
      },
      legend: {
        data: ['一线报告问题']
      },
      tooltip: {
        show: true
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true
          },
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
        }
      },
      dataZoom: {
        show: true,
        realtime: true,
        start: 0,
        end: 100
      },
      xAxis: {
        data: [],
        axisLabel: {
          interval: 0,
          rotate: 60
        }
      },
      yAxis: {},
      series: {
        name: '一线报告问题',
        data: [],
        type: 'line',
        smooth: true
      }
    };
    this.myChart = echarts.init(document.getElementById('graph') as any);
    // (this.myChart as any).setOption(this.option as any);
    window.onresize = (this.myChart as any).resize;
    this.getTrend(this.query);
  }
  loadGraph() {
    this.option['xAxis']['data'] = this.xList;
    this.option['series']['data'] = this.yList;
    this.option['series']['areaStyle'] = {};
    let chart = this.myChart;
    if (typeof(chart) === 'undefined' || chart == null) {
      chart = echarts.getInstanceByDom(document.getElementById('graph') as any);
    }
    (chart as any).setOption(this.option);
  }
  getTrend(condition: Object) {
    const result = this.service.getProjects();
    result.subscribe((res: Response) => {
      const responseData = res.json();
      console.log(responseData);
      if (responseData['success']) {
        console.log(responseData);
        this.projects = responseData['records'];
        console.log(this.projects);
      }
    }, (err: string) => {
      console.log(err);
    });
    const response = this.service.getTrendData(condition);
    response.subscribe((res: Response) => {
      const responseData = res.json();
      console.log(responseData);
      if (responseData['success']) {
        console.log(responseData);
        const records = responseData['records'];
        this.xList = records.map(item => item.values[0]);
        this.yList = records.map(item => item.values[1]);
        console.log(this.xList);
        console.log(this.yList);
      }
      this.loadGraph();
    }, (err: string) => {
      console.log(err);
    });
  }
  getData() {
    if (typeof(this.project) === 'undefined' || this.project == null) {
      this.project = '';
    }
    (this.query as any).criteria.project = this.project;
    const range: Array<string> = [];
    console.log(this.dateRange);
    if (typeof(this.dateRange) !== 'undefined' && this.dateRange.length !== 0) {
      range.push(this.dateRange[0].toISOString());
      range.push(this.dateRange[1].toISOString());
    }
    (this.query as any).criteria.daterange = range;
    this.getTrend(this.query);
  }
}
