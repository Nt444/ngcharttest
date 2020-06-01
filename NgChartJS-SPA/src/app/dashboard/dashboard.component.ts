import { Component, OnInit } from '@angular/core';
import { Info } from '../_models/info';
import { InfoService } from '../_services/info.services';
import { TradeDataService } from '../_services/trade-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  momentRange: number;
  momentStart: number;
  info: Info;

  constructor(
    private infoService: InfoService,
    private tradeDataServise: TradeDataService
  ) { }

  ngOnInit(): void {

    setTimeout(() => this.momentRange = 0);

    this.infoService.info.subscribe((info: Info) => {
      this.info = info;
    });
  }

  changeMomentStart() {
    this.momentStart = this.info.momentStart + (this.info.momentEnd - this.info.momentStart) * this.momentRange / 100;
    this.tradeDataServise.restart(this.momentStart);

    console.log(`momentStart ${this.momentStart} momentStartPercent ${this.momentRange}`);
  }
}
