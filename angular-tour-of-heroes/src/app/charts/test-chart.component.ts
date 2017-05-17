import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SINGLE } from './data';

@Component({
  selector: 'test-chart',
  templateUrl: './test-chart.component.html',
})

export class TestChartComponent {

  @ViewChild('test-chart-1') elementView: ElementRef;

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
  
  onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    //console.log(event.width);
    this.barPadding = event.width > 300 ? (Math.min((event.width-300)/200,1) * 48) + 16 : 16;
    console.log(this.barPadding);
  }
}