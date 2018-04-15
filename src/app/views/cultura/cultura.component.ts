import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as _ from "lodash";

@Component({
  selector: 'app-cultura',
  templateUrl: './cultura.component.html',
  styleUrls: ['./cultura.component.css']
})
export class CulturaComponent implements OnInit {

  selectedArea: any;
  selectedTerms: any;
  termsDict: any;
  data: {};
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getData()
    .subscribe(data => {
      this.termsDict  = _.groupBy(data, (d)=>d.Area)
      
      this.data = _.keys(this.termsDict).map(d => {
        return {text:d, value:this.termsDict[d].length}
      })
    })
  }


  selectedItem(item) {
    this.selectedArea = item;
    this.selectedTerms = this.termsDict[item];
  }

}
