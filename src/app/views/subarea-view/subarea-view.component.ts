import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subarea-view',
  templateUrl: './subarea-view.component.html',
  styleUrls: ['./subarea-view.component.css']
})
export class SubareaViewComponent implements OnInit {
  selectedItem: any;
  @Input()
  data;
  
  constructor() { }

  ngOnInit() {
  }

  selectItem(item) {
    this.selectedItem=item;
  }

}
