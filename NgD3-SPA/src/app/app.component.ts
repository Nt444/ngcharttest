import { Component, ViewChild, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {

  chartData = [];

  transitionTime = 2000;
  refreshInterval;

  constructor() { }

  ngOnInit() { }

  initialize() {

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.generateData();
    this.refreshInterval = setInterval(() => {
      this.generateData();
    }, this.transitionTime);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngAfterContentInit() {
    this.initialize();
  }

  generateData() {
    this.chartData = [];
    const random = randomInt(10, 20);
    for (let i = 0; i < 100; i++) {
      const x = i / random / 2;
      this.chartData.push({
        x: i,
        y: Math.sin(x * x) + Math.sin(x)
      });
    }
  }
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
