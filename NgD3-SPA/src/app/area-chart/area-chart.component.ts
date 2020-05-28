import { Component, OnInit, OnChanges, Input, ElementRef, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',
  template: ''
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() data: number[];
  svg: any;
  g: any;

  margin = { left: 50, top: 20, right: 20, bottom: 50 };

  constructor(private elRef: ElementRef) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (!this.svg) {
        this.initChart();
      }
      this.updateChart(changes.data.currentValue);
    }
  }

  initChart() {

    this.svg = // d3.select('.chart-svg')
      d3.select(this.elRef.nativeElement).append('svg')
        .attr('width', '100%')
        .attr('height', '100%');

    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.g.append('g')
        .attr('class', 'x-axis');

    this.g.append('g')
        .attr('class', 'y-axis');

    // this.g.append('path')
    //     .attr('class', 'path-data')
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-width', 2.5);
  }

  updateChart(data: any[]) {

    const box = this.svg.node().getBoundingClientRect();
    const width = box.width - this.margin.left - this.margin.right;
    const height = box.height - this.margin.top - this.margin.bottom;

    const t = d3.transition()
        .duration(100)
        .ease(d3.easeCubicInOut);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    this.g.select('.x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .transition(t)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

    this.g.select('.y-axis')
      .transition(t)
      .call(d3.axisLeft(y));

    // this.g.select('.path-data')
    //   .datum(data)
    //   .attr('d', d3.line()
    //     .x((d: any) => x(d.x))
    //     .y((d: any) => y(d.y))
    //   );

    const red = { color: 'red', diff: 0, cssClass: 'candle' };
    const blue = { color: 'blue', diff: -1, cssClass: 'candle2' };
    [red, blue].forEach(el => {
      const circles = this.g.selectAll('line.' + el.cssClass).data(this.data);

      circles.exit()
          .attr('class', 'exit')
          .remove();

      // ENTER new elements present in new data.
      circles.enter()
          .append('line')
          .attr('class', 'enter ' + el.cssClass)
          // .attr('fill', 'red')
          .attr('stroke', el.color)
          .merge(circles)
          .transition(t)
              // .attr('cy', d => y(d.y))
              // .attr('cx', d => x(d.x))
              // .attr('r', 1);
              .attr('x1', d => x(d.prv.x))
              .attr('x2', d => x(d.x))
              .attr('y1', d => y(d.prv.y + el.diff))
              .attr('y2', d => y(d.y + el.diff));
    });
  }
}
