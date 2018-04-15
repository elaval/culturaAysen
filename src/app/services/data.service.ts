import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_URL } from '../config';
import { Subject } from 'rxjs/Subject';
import * as d3 from "d3";

@Injectable()
export class DataService {

  data: Object;
  constructor(
    private http: HttpClient
  ) { }

  getData() {
    const subject = new Subject();

    this.http.get(DATA_URL, {responseType:'text'})
    .subscribe(data => {
      this.data = d3.tsvParse(data);
      subject.next(this.data);
    })

    return subject.asObservable();
  }

}
