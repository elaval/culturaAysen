import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subarea-view',
  templateUrl: './subarea-view.component.html',
  styleUrls: ['./subarea-view.component.css']
})
export class SubareaViewComponent implements OnInit {
  popoverPosition: string = "left";
  selectedItem: any;
  @Input()
  data;
  
  constructor() { }

  ngOnInit() {
    window.innerWidth 
  }

  updatePopoverPosition() {
    if (window.innerWidth < 800) {
      this.popoverPosition = "top"
    } else {
      this.popoverPosition = "left"
    }
  }

  selectItem(item) {
    this.selectedItem=item;
  }

}
