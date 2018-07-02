import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {StatisticsService} from './statistics.service';
import * as echars from 'echarts';
import {Range} from '../range';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  service: StatisticsService;
  data: any;
  query: Object;
  dateRange: Array<Date>;
  option: Object;
  myChart: Object;
  range: Range;
  ranges: Object;
  constructor( public http: Http) {
    this.service = new StatisticsService(this.http);
    this.range = new Range();
    this.ranges = {};
  }

  ngOnInit() {
    this.query = {
      criteria: {
        project: '',
        daterange: []
      },
      order: {
        by: '',
        type: ''
      },
      page: {
        currentPage: 1,
        size: 0
      }
    };
    this.ranges = this.range.getDateRange();
    this.myChart = echars.init(document.getElementById('graph') as any);
    this.option = {
      title: {
        text: '',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333333'
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 40,
        bottom: 20,
        data: [],
        selected: []
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
          restore: {}
        }
      },
      series: {
        name: '',
        type: 'pie',
        smooth: true,
        data: [],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    };
    this.getData(this.query);
  }
  getData(query: Object) {
    const response = this.service.getData(this.query);
    response.subscribe((res: Response) => {
      const responseData = res.json();
      console.log(responseData);
      if (responseData.success) {
        console.log(responseData.records);
        const records = responseData.records;
        this.data = records.map(item => {
          if (item.values[0].trim() === '') {
            item.values[0] = 'unknown';
          }
          return{name: item.values[0], value: item.values[1]};
        });
        console.log(this.data);
      }
      this.loadGraph();
    }, (err: string) => {
      console.log(err);
    });
  }
  loadGraph() {
    const legend: Array<string> = this.data.map(item => item.name);
    const selected: Array<string> = [];
    for (let i = 0; i < this.data.length; i++) {
      if (parseInt(this.data[i].value, 0) >= 17) {
        selected.push(this.data[i].name);
      }
    }
    console.log(selected);
    this.option['legend']['data'] = legend;
    this.option['legend']['selected'] = selected;
    this.option['series']['data'] = this.data;
    let chart = this.myChart;
    if (typeof(chart) === 'undefined' || chart == null) {
      chart = echars.getInstanceByDom(document.getElementById('graph') as any);
    }
    (chart as any).setOption(this.option);
  }
  submit() {
    console.log(this.dateRange);
    const range: Array<string> = [];
    if (typeof(this.dateRange) !== 'undefined' && this.dateRange.length !== 0) {
      range.push(this.dateRange[0].toISOString());
      range.push(this.dateRange[1].toISOString());
    }
    (this.query as any).criteria.daterange = range;
    this.getData(this.query);
  }
}
