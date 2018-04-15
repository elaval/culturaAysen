import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: 'app-area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.css']
})
export class AreaViewComponent implements OnInit {
  subAreas: any;
  @Input()
  data;

  @Input()
  area;

  constructor() { }

  ngOnInit() {
  }

  render() {
    if (this.data) {
      _.each(this.data, (d) => {
        d.date = moment(d["Fecha de la nota"], "DD/MM/YYYY");
      })
      const a = moment();
      const subAreaDict = _.groupBy(this.data, (d) => d["Sub area"])
      this.subAreas = _.keys(subAreaDict).map(d => {
        return {
          subArea : d,
          items: _.sortBy(subAreaDict[d], d => d.date)
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.render()
  }


}
