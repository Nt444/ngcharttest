import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {}

  get info() {
    return this.http.get(`http://localhost:53030/api/ticks/info`);
  }
}
