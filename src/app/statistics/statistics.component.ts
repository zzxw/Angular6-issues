import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import {StatisticsService} from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  service: StatisticsService;
  data: any;
  constructor( public http: Http) {
    this.service = new StatisticsService(this.http);
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    const response = this.service.getData();
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
      if (parseInt(this.data[i].value) >= 17) {
        selected.push(this.data[i].name);
      }
    }
    console.log(selected);
    // const myChart = echars.init(document.getElementById('graph') as any);
    const option = {
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
        data: legend,
        selected: selected
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
        data: this.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    };
    // myChart.setOption(option as any);
  }

}
