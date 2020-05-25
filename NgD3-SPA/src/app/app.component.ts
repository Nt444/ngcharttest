import { Component, ViewChild, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import { AreaChartComponent } from './area-chart/area-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('areaChart', { static: true }) chart: AreaChartComponent;

  chartData = [];

  transitionTime = 200;
  refreshInterval;
  driftInterval;

  N = 5;
  means = [15, 30, 45, 60, 75];
  drifts = [0.1, -.1, 0, .1, -.1];


  constructor() { }

  ngOnInit() {  }

  initialize() {

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.generateData();
    this.chart.data = [...this.chartData];
    this.refreshInterval = setInterval(() => {
      if (document.hasFocus()) {
        this.generateData();
        this.chart.data = [...this.chartData];
      }
    }, this.transitionTime);
    this.drift();
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.driftInterval) {
      clearInterval(this.driftInterval);
    }
  }

  ngAfterContentInit() {
    this.initialize();
  }

  drift() {
    this.driftInterval = setInterval(() => {
       for (let i = 0; i < this.N; i++) {
         this.drifts[i] = -this.drifts[i];
       }
    }, 160 * this.transitionTime);

  }
  generateData() {
    this.chartData = [];
    const mf = 1.0;

    const sigma = mf * randomInt(2, 2) ;
    for (let i = 0; i < this.N; i++) {
      this.means[i] += this.drifts[i];
      const randomizer = d3.randomNormal(this.means[i], sigma);
      const times = [];
      for (let j = 0; j < 1000; j++) {
        times.push(Math.floor(randomizer()));
      }
      this.chartData.push(times);
    }
  }
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
