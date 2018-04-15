import { Component, OnInit, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as cloud from "d3-cloud";
import * as d3 from "d3";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  @Input()
  data: any[] = [{text: "blue", value:10}, {text: "red", value:20}, {text: "green", value:5}]

  @Output()
  selectedItem = new EventEmitter<string>();
  
  inited: boolean;
  size: d3.ScaleLinear<number, number>;

  color: d3.ScaleOrdinal<string, string>;
  fill: d3.ScaleOrdinal<string, string>;
  words: string[];
  width= 800;
  height= 500;
  layout: any;
  constructor(
    private elRef: ElementRef
  ) {
    this.words = ["hola", "como", "están"]
   }

  ngOnInit() {

    this.size = d3.scaleLinear()
    .range([8,42]);

    this.fill = d3.scaleOrdinal(d3.schemeCategory10);
    this.layout = cloud()
    .size([500, 500])
    .padding(5)
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end",(d) => this.draw(d));

    this.inited = true;
    this.updateContainerSize()

    this.render();
  }

  render() {
    if (this.data && this.inited) {
      const valueRange = d3.extent(this.data, d => d.value);
      this.size.domain(valueRange)
      this.layout
      .words(this.data.map((d) => {
        return {text: d.text, size: this.size(d.value)};
      }))
      .start();
    }
  }

  draw(words) {

    d3.select(this.elRef.nativeElement).select("svg")
        .attr("width", this.layout.size()[0])
        .attr("height", this.layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d:any) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", (d, i) => { 
          const fillFunc = this.fill;
          const color = fillFunc(i+"");
          return  color
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d:any) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d:any) { return d.text; })
        .on("click", (d:any) => {
          this.selectedItem.emit(d.text)
        })
        
        ;
  }

  updateContainerSize() {
    let myNode:HTMLElement = <HTMLElement>this.elRef.nativeElement;
    let parentNode:HTMLElement = <HTMLElement>myNode.parentNode;

    if (parentNode) {

      
      let width = parentNode.getBoundingClientRect().width;

      this.width =  width;
      /*this.svg
        .attr("width",this.width+this.margin.left+this.margin.right);

      this.mainContainer
      .attr("transform", `translate(${this.width/2}, ${this.height/2})`);
      */


      this.layout
      .size([this.width, this.height])

    }


  }

  ngOnChanges(changes: SimpleChanges) {
    this.render()
  }

}
