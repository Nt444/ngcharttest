import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartMainComponent } from './chart-main/chart-main.component';
import { TableTradesComponent } from './table-trades/table-trades.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartMainComponent,
    TableTradesComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
