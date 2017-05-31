import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { DATA } from './heat-map-chart.data';
import * as chroma from 'chroma-js';

@Component({
  selector: 'heat-map-chart',
  templateUrl: './heat-map-chart.component.html',
})

export class HeatMapChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;

  DATA: any[];

  view = undefined;

  // options
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  innerPadding = '0%';
  xAxisLabel = 'Time of Day';
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ["#97749C","#EA868D"]
  };

  xAxisTickFormatting = this.calendarAxisTickFormatting;

  constructor() {
    Object.assign(this, {DATA});
  }
  
  calendarAxisTickFormatting(timeString: string): string {
    // const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
    const date = new Date(timeString);
    //return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    // console.log(date.getDate + ", " + this.monthName.format(date));
    return date.getMinutes() == 0 && date.getHours() % 2 == 0 ? ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) : "";
    // const monday = new Date(mondayString);
    // const month = monday.getMonth();
    // const day = monday.getDate();
    // const year = monday.getFullYear();
    // const lastSunday = new Date(year, month, day - 1);
    // const nextSunday = new Date(year, month, day + 6);
    // return (lastSunday.getMonth() !== nextSunday.getMonth()) ? this.monthName.format(nextSunday) : '';
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