import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DATA } from './line-basic-chart.data';
import * as chroma from 'chroma-js';
import * as shape from 'd3-shape';

@Component({
  selector: 'line-basic-chart',
  templateUrl: './line-basic-chart.component.html',
})

export class LineBasicChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;

  DATA: any[];
  
  view = undefined;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Census Date';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  autoScale = true;
  timeline = false;
  xAxisTickFormatting = this.calendarAxisTickFormatting;
  curve = shape.curveLinear;
  showStep = false;

  minShowLegendWindowWidth = 400;

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  constructor() {
    Object.assign(this, {DATA});
  }
  
  ngOnInit() {
    this.showLegend = this.elementView.nativeElement.offsetWidth > this.minShowLegendWindowWidth ? true : false;
  }

  onSelect(event) {
    //console.log(event);
  }

  onResize(event) {
    this.showLegend = event.width > this.minShowLegendWindowWidth ? true : false;
  }

  toggleShowStep() {
    this.showStep = !this.showStep;
    this.curve = this.showStep ? shape.curveStep : shape.curveLinear;
  }

  calendarAxisTickFormatting(timeString: string): string {
    const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
    const date = new Date(timeString);
    return `${date.getDate()} ${monthName.format(date)}`;
  }
}