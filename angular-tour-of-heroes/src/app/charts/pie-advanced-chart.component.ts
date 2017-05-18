import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { SINGLE } from './vert-bar-chart.data';
import * as chroma from 'chroma-js';

@Component({
  selector: 'pie-advanced-chart',
  templateUrl: './pie-advanced-chart.component.html',
})

export class PieAdvancedChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;

  SINGLE: any[];
  MULTI: any[];

  view = undefined;

  // options
  gradient = false;
  
  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  constructor() {
    Object.assign(this, {SINGLE});
  }
  
  ngOnInit() {
    //this.barPadding = this.getPadding(this.elementView.nativeElement.offsetWidth);
  }

  onSelect(event) {
    //console.log(event);
  }

  onResize(event) {
    //this.barPadding = this.getPadding(event.width);
  }
}