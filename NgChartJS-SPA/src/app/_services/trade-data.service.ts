import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tick } from '../_models/tick';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradeDataService {

  private dataStorage: Tick[] = [];
  private dataProvider: Subject<Tick[]>;
  private dataGetter: Observable<any>;
  private loop: any;

  public counter = 0;
  public momentCrt = 0;
  public interval = 1000;
  public snapSize = 10;

  constructor(private http: HttpClient) { }

  start() {
    this.loop = setInterval(() => {
      this.iteration();
    }, this.interval);
  }

  stop() {
    this.dataGetter = null;
    clearInterval(this.loop);
    this.loop = null;
    console.log('stop data');
  }

  loadNeeded(moment: number, size: number) {
    if (!this.dataGetter) {
      this.dataGetter = this.http.get(`${environment.apiUrl}ticks?startmoment=${moment}&count=${size}`);
      this.dataGetter.subscribe({
        next: x => {
          const initialLoad = this.dataStorage.length === 0;
          this.dataStorage = [...this.dataStorage, ...x];
          if (!this.momentCrt) {
            this.momentCrt = this.dataStorage[0].moment;
          }
          if (x.length === 0) {
            console.log('dataGetter: no data came');
            this.stop();
          }
          if (x.length !== 0 && initialLoad) {
            this.iteration();
          }
        },
        error: x => {
          console.log('dataGetter: error');
          console.log(x);
          this.stop();
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
      this.dataProvider = new Subject();
      this.start();
    }
    return this.dataProvider;
  }

  restart(momentStart: number) {
    this.dataStorage = [];
    this.momentCrt = momentStart;
    if (!this.loop) {
      this.start();
    }
    this.iteration();
  }
}
