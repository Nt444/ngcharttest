import { Component, OnInit, Input } from '@angular/core';
import { TradeDataService } from '../_services/trade-data.service';
import { Tick } from '../_models/tick';

@Component({
  selector: 'app-chart-main',
  templateUrl: './chart-main.component.html',
  styleUrls: ['./chart-main.component.css']
})
export class ChartMainComponent implements OnInit {

  public options = {
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
        type: 'time',
        time: {
          // unit: 'minute'
          displayFormats: {
            second: 'H:mm:ss'
          }
        },
        ticks: {
          fontColor: 'white'
        }
      }]
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
        borderWidth: 2
      },
      point: {
        radius: 0
      }
    },
    tooltips: {
      enabled: false
    }
  };

  // labels = [];

  // data = [
  //   {
  //     data: [],
  //     label: 'Bid',
  //     fill: false,
  //     borderColor: 'rgba(0, 200, 0, 0.8)'
  //   },
  //   {
  //     data: [],
  //     label: 'Ask',
  //     fill: '0',
  //     borderColor: 'rgba(255, 0, 0, 0.8)',
  //     backgroundColor: 'rgba(255, 255, 255, 0.05)'
  //   }
  // ];
  data = [
    {
      data: [],
      label: 'Bid',
      fill: false,
      borderColor: 'rgba(0, 200, 0, 0.8)',
      backgroundColor: 'rgba(0, 200, 0, 0.3)'
    },
    {
      data: [],
      label: 'Ask',
      fill: false,
      borderColor: 'rgba(255, 0, 0, 0.8)',
      backgroundColor: 'rgba(255, 0, 0, 0.4)'
    }
  ];

  counter = 0;
  timeInterval: { from: number, to: number } = { from: 0, to: 0 };
  loading = true;

  constructor(private tradeDataService: TradeDataService) { }

  ngOnInit(): void {
    this.tradeDataService.graphData.subscribe((ticks: Tick[]) => {
      if (ticks.length > 0) {
        // this.data[0].data = ticks.map(tick => tick.bid);
        // this.data[1].data = ticks.map(tick => tick.ask);
        // this.labels = ticks.map(tick => tick.moment);
        // this.data = ticks.map(tick => ({
        //   x: tick.ask,
        //   y: tick.bid,
        //   r: 5
        // }));
        this.data[0].data = ticks.map(tick => ({
          x: tick.moment,
          y: tick.bid,
          r: Math.sqrt(tick.volumeBid) / 6 + 1
        }));
        this.data[1].data = ticks.map(tick => ({
          x: tick.moment,
          y: tick.ask,
          r: Math.sqrt(tick.volumeAsk) / 6 + 1
        }));
        this.counter = this.tradeDataService.counter;
        if (ticks?.length > 0) {
          this.timeInterval = {
            from: ticks[0].moment,
            to: ticks[ticks.length - 1].moment
          };
        }
      }
      this.loading = ticks.length === 0;
    });
  }
}
