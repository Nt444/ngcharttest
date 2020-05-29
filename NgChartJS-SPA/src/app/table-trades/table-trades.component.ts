import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-trades',
  templateUrl: './table-trades.component.html',
  styleUrls: ['./table-trades.component.css']
})
export class TableTradesComponent implements OnInit {

  @Input() data: any;
  @Input() labels: any;
  showCount = 30;

  constructor() { }

  ngOnInit(): void {
  }

  data2Show() {
    const result = [];
    const bids = this.data[0].data;
    const asks = this.data[1].data;
    const iLast = Math.max(0, bids.length - this.showCount);
    for (let i = bids.length - 1; i >= iLast; i--) {
      result.push({
        label: this.labels[i],
        bids: bids[i],
        asks: asks[i]
      });
    }
    return result;
  }
}
