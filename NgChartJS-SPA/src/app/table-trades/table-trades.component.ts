import { Component, OnInit, Input } from '@angular/core';
import { TradeDataService } from '../_services/trade-data.service';
import { Tick } from '../_models/tick';

@Component({
  selector: 'app-table-trades',
  templateUrl: './table-trades.component.html',
  styleUrls: ['./table-trades.component.css']
})
export class TableTradesComponent implements OnInit {

  ticks: Tick[];

  constructor(private tradeDataService: TradeDataService) { }

  ngOnInit(): void {
    this.tradeDataService.graphData.subscribe((ticks: Tick[]) => {
      ticks.reverse();
      if (ticks.length > 0) {
        this.ticks = ticks.slice(0, 25);
      }
    });
  }
}
