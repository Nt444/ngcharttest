import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tick } from '../_models/tick';

@Injectable({
  providedIn: 'root'
})
export class TradeDataService {

  private dataStorage: Tick[] = [];
  private dataProvider: Subject<Tick[]>;
  private dataGetter: Observable<any>;

  public counter = 0;
  public momentCrt = 0;
  public interval = 500;
  public snapSize = 10;

  constructor(private http: HttpClient) { }

  init() {
    this.dataProvider = new Subject();
    setInterval(() => {
      this.iteration();
    }, this.interval);
  }

  loadNeeded(moment: number, size: number) {
    if (!this.dataGetter) {
      this.dataGetter = this.http.get(`http://localhost:53030/api/ticks?startmoment=${moment}&count=${size}`);
      this.dataGetter.subscribe({
        next: x => {
          this.dataStorage = [...this.dataStorage, ...x];
          if (!this.momentCrt) {
            this.momentCrt = this.dataStorage[0].moment;
          }
        },
        error: x => {
          console.log('dataGetter error ' + x);
          this.dataGetter = null;
        },
        complete: () => {
          console.log('dataGetter complete');
          this.dataGetter = null;
        }
      });
    }
  }

  iteration() {
    ++this.counter;
    let res = [];
    if (this.dataStorage.length === 0) {
      this.loadNeeded(this.momentCrt, 3 * this.snapSize);
    }
    else {
      let id = this.dataStorage.findIndex(x => x.moment >= this.momentCrt);
      if (id === -1) {
        this.dataStorage = [];
        console.log('Error 54032167');
      }
      else {
        if (id >= this.snapSize) {
          this.dataStorage = this.dataStorage.slice(id);
          id = 0;
        }
        const len = this.dataStorage.length - id;
        if (len < this.snapSize * 2) {
          const lastTick = this.dataStorage[this.dataStorage.length - 1];
          this.loadNeeded(lastTick.moment + 1, this.snapSize);
        }
        if (len >= this.snapSize) {
          res = this.dataStorage.slice(id, id + this.snapSize);
          this.momentCrt = this.dataStorage[id + 1].moment;
        }
      }
    }
    this.dataProvider.next(res);
  }

  get graphData() {
    if (!this.dataProvider) {
      this.init();
    }
    return this.dataProvider;
  }

  reset() {
    this.dataStorage = [];
  }
}
