import { Component, ViewChild, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {

  chartData = [];

  transitionTime = 500;
  refreshInterval;
  i = 0;
  prevPoint = null;

  constructor() { }

  ngOnInit() { }

  initialize() {

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.generateData();
    this.refreshInterval = setInterval(() => {
      if  (document.hasFocus()) {
        this.generateData();
      }
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
    const max = 100;
    const data = [...this.chartData];
    const random = randomInt(10, 20);
    for (let i = 0; i < max - this.chartData.length + 1; i++, this.i++) {
      const x = this.i / 10;
      data.push(this.prevPoint = {
        x: this.i,
        y: Math.sin(x) + x / 5,
        prv: this.prevPoint
      });
    }
    while (data.length > max) {
      data.shift();
    }

    this.chartData = data;
  }
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
