import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { SINGLE } from './vert-bar-chart.data';
import * as chroma from 'chroma-js';

@Component({
  selector: 'vert-bar-chart',
  templateUrl: './vert-bar-chart.component.html',
})

export class VertBarChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;
  @ViewChild('sortOrderAsc') sortOrderAsc: ElementRef;
  @ViewChild('sortOrderDesc') sortOrderDesc: ElementRef;

  DATA: any[];

  view = undefined;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  barPadding = 4;
  
  sortAsc: boolean;
  
  minShowLegendWindowWidth = 400;

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  constructor() {
    // Instead of manipulating the data object imported directly, do a deep copy and sort the copy,
    // Otherwise, all other graphs that imports the data object will be affected
    this.DATA = JSON.parse(JSON.stringify({SINGLE}));
    this.DATA = this.DATA['SINGLE'];
  }
  
  ngOnInit() {
    this.barPadding = this.getPadding(this.elementView.nativeElement.offsetWidth);
    this.showLegend = this.elementView.nativeElement.offsetWidth > this.minShowLegendWindowWidth ? true : false;
    this.setSortOrderDesc();
  }

  onSelect(event) {
    //console.log(event);
  }

  onResize(event) {
    this.barPadding = this.getPadding(event.width);
    this.showLegend = event.width > this.minShowLegendWindowWidth ? true : false;
  }

  getPadding(width: number): number {
    let min_max = {
      minPadding: 4,
      maxPadding: 8,
      minWidth: 350,
      maxWidth: 450
    };

    return width > min_max.minWidth ? (( Math.min(width-min_max.minWidth, min_max.maxWidth-min_max.minWidth)/ (min_max.maxWidth-min_max.minWidth) ) * ( min_max.maxPadding - min_max.minPadding )) + min_max.minPadding : min_max.minPadding;
  }

  sortBy(field: string, orderAsc: boolean, primer?: (any) => any): ((a: any, b: any) => number) {
    let getValue = primer ? function(x) { return primer(x[field]) } : function(x) { return x[field] };
    let order = orderAsc ? 1 : -1;
    return function(a,b): number {
      return getValue(a) === getValue(b) ? 0 : getValue(a) > getValue(b) ? order : order * -1;
    };
  }

  handleSort(event) {
    //console.log(event);
    console.log(event.target.value);
  }

  setSortOrderAsce() {
    this.sortAsc = true;
    this.setSortOrder();    
  }

  setSortOrderDesc() {
    this.sortAsc = false;
    this.setSortOrder();
  }

  setSortOrder() {
    this.DATA.sort(this.sortBy('value', this.sortAsc));
    this.DATA = [...this.DATA];
  }
}