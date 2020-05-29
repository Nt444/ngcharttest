import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'NgChartJS-SPA';

  public labels = [];

  public data = [
    {
      data: [],
      label: 'Bid',
      fill: false,
      borderColor: 'rgba(0, 200, 0, 0.8)',
      borderWidth: 2,
      pointRadius: 0
    },
    {
      data: [],
      label: 'Ask',
      fill: '0',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 0, 0, 0.8)',
      borderWidth: 2,
      pointRadius: 0
    }
  ];

  count = 0;
  lastBid = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.labels.push(this.count);
      const bid = this.lastBid + Math.random() * 10 - 5;
      this.lastBid = bid;
      const ask = bid + Math.random() * 5 + 20;
      this.data[0].data.push(bid);
      this.data[1].data.push(ask);
      this.count++;

      while (this.labels.length > 100) {
        this.labels.shift();
        this.data[0].data.shift();
        this.data[1].data.shift();

        const temp = [...this.data];
        this.data = temp;

      }
    }, 250);
  }
}
