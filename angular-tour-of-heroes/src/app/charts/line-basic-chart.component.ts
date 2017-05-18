import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DATA } from './line-basic-chart.data';
import * as chroma from 'chroma-js';

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

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  constructor() {
    Object.assign(this, {DATA});
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

  calendarAxisTickFormatting(timeString: string): string {
    const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
    const date = new Date(timeString);
    // console.log(date.getDate + ", " + this.monthName.format(date));
    return `${date.getDate()} ${monthName.format(date)}`;
    // const monday = new Date(mondayString);
    // const month = monday.getMonth();
    // const day = monday.getDate();
    // const year = monday.getFullYear();
    // const lastSunday = new Date(year, month, day - 1);
    // const nextSunday = new Date(year, month, day + 6);
    // return (lastSunday.getMonth() !== nextSunday.getMonth()) ? this.monthName.format(nextSunday) : '';
  }

  // getPadding(width: number): number {
  //   let min_max = {
  //     minPadding: 16,
  //     maxPadding: 72,
  //     minWidth: 350,
  //     maxWidth: 450
  //   };

  //   return width > min_max.minWidth ? (( Math.min(width-min_max.minWidth, min_max.maxWidth-min_max.minWidth)/ (min_max.maxWidth-min_max.minWidth) ) * ( min_max.maxPadding - min_max.minPadding )) + min_max.minPadding : min_max.minPadding;
  // }
}