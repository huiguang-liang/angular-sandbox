import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DATA } from './bubble-chart.data';
import * as chroma from 'chroma-js';

@Component({
  selector: 'bubble-chart',
  templateUrl: './bubble-chart.component.html',
})

export class BubbleChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;

  DATA: any[];

  view = undefined;

  // options
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Census Date';
  yAxisLabel = 'Life expectancy (Years)';
  autoScale = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  schemeType: string = 'ordinal';
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showGridLines = true;
  showLegend = true;
  legendTitle = 'Legend';
  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };
  xAxisTickFormatting = this.calendarAxisTickFormatting;

  constructor() {
    Object.assign(this, {DATA});
  }

  calendarAxisTickFormatting(timeString: string): string {
    const date = new Date(timeString);
    return date.getFullYear().toString();
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