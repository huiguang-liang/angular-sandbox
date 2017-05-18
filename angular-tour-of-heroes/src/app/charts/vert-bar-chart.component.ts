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

  SINGLE: any[];
  MULTI: any[];

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
  barPadding = 64;

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  constructor() {
    Object.assign(this, {SINGLE});
  }
  
  ngOnInit() {
    this.barPadding = this.getPadding(this.elementView.nativeElement.offsetWidth);
  }

  onSelect(event) {
    //console.log(event);
  }

  onResize(event) {
    this.barPadding = this.getPadding(event.width);
  }

  getPadding(width: number): number {
    let min_max = {
      minPadding: 16,
      maxPadding: 96,
      minWidth: 350,
      maxWidth: 450
    };

    return width > min_max.minWidth ? (( Math.min(width-min_max.minWidth, min_max.maxWidth-min_max.minWidth)/ (min_max.maxWidth-min_max.minWidth) ) * ( min_max.maxPadding - min_max.minPadding )) + min_max.minPadding : min_max.minPadding;
  }
}