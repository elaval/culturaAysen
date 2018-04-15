import { Component, OnInit, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as cloud from "d3-cloud";
import * as d3 from "d3";

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  wordsContainer: d3.Selection<d3.BaseType, Datum, PElement, PDatum>;
  mainContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  svg: d3.Selection<d3.BaseType, {}, null, undefined>;
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

    this.svg = d3.select(this.elRef.nativeElement).select("svg");
    this.mainContainer = this.svg;

    this.wordsContainer = this.mainContainer.append("g")
    .attr("class", "words container")
    

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



    this.svg
        .attr("width", this.layout.size()[0])
        .attr("height", this.layout.size()[1]);

    this.wordsContainer
      .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")

    let words = this.wordsContainer.selectAll("text.word")
        .data(words)

    words = words.enter()
        .append("text")
        .attr("class", "word")
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .on("click", (d:any) => {
          this.selectedItem.emit(d.text)
        })
        .merge(words);

    words
        .style("font-size", function(d:any) { return d.size + "px"; })
        .style("fill", (d, i) => { 
          const fillFunc = this.fill;
          const color = fillFunc(i+"");
          return  color
        })
        .attr("transform", function(d:any) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d:any) { return d.text; })
        ;
  }

  updateContainerSize() {
    let myNode:HTMLElement = <HTMLElement>this.elRef.nativeElement;
    let parentNode:HTMLElement = <HTMLElement>myNode.parentNode;

    if (parentNode) {

      
      let width = parentNode.getBoundingClientRect().width;

      this.width =  width;
      this.height =  window.innerHeight / 2;

      this.layout
      .size([this.width, this.height])

    }


  }

  onResize(e) {
    this.updateContainerSize();
    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.render()
  }

}
