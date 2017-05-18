import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SINGLE } from './data';

@Component({
  selector: 'vert-bar-chart',
  templateUrl: './vert-bar-chart.component.html',
})

export class VertBarChartComponent implements OnInit {

  @ViewChild('test') elementView: ElementRef;

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
    domain: ['#AA84B1', '#9990BE', '#849CC6', '#6CA7CA']
  };

  constructor() {
    Object.assign(this, {SINGLE});
  }
  
  ngOnInit() {
    //console.log('width: ' + this.elementView.nativeElement.offsetWidth);
    this.barPadding = this.getPadding(this.elementView.nativeElement.offsetWidth);
    console.log(this.barPadding);
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    //console.log(event.width);
    //this.barPadding = event.width > 300 ? (Math.min((event.width-300)/200,1) * 48) + 16 : 16;
    this.barPadding = this.getPadding(event.width);
    console.log(this.barPadding);
  }

  getPadding(width: number): number {
    let min_max = {
      minPadding: 16,
      maxPadding: 72,
      minWidth: 350,
      maxWidth: 450
    };

    return width > min_max.minWidth ? (( Math.min(width-min_max.minWidth, min_max.maxWidth-min_max.minWidth)/ (min_max.maxWidth-min_max.minWidth) ) * ( min_max.maxPadding - min_max.minPadding )) + min_max.minPadding : min_max.minPadding;
  }
}