import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-main',
  templateUrl: './chart-main.component.html',
  styleUrls: ['./chart-main.component.css']
})
export class ChartMainComponent implements OnInit {

  @Input() data: any;
  @Input() labels: any;
  @Input() count: number;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: {
      duration: 0
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }]
    },
    elements: {
      line: {
          tension: 0 // disables bezier curves
      }
    },
    tooltips: {
      enabled: false
    }
  };

  public barChartType = 'line';
  public barChartLegend = true;

  constructor() { }

  ngOnInit(): void { }
}
