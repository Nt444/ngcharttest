import { Component, OnInit } from '@angular/core';
import { TradeDataService } from './_services/trade-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: TradeDataService) { }

  ngOnInit(): void {
    this.dataService.interval = 250;
    this.dataService.momentCrt = 0;
    this.dataService.snapSize = 50;
  }
}
