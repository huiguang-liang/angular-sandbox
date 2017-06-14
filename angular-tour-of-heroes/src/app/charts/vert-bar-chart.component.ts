import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { SINGLE } from './vert-bar-chart.data';
import { BaseChartComponent } from '@swimlane/ngx-charts';
import * as chroma from 'chroma-js';
import * as SvgSaver from 'svgsaver';

@Component({
  selector: 'vert-bar-chart',
  templateUrl: './vert-bar-chart.component.html',
})

export class VertBarChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;
  //@ViewChild('sortOrderAsc') sortOrderAsc: ElementRef;
  //@ViewChild('sortOrderDesc') sortOrderDesc: ElementRef;
  @ViewChild('vertBarChart') vertBarChart;

  DATA: any[];
  ORIGINAL_DATA: any[];

  view = undefined;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Activities';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  barPadding = 4;
  
  sortAsc = false;
  collapseExtreme = false;
  showPercentage = false;

  minShowLegendWindowWidth = 400;

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  svgSaver = new SvgSaver();

  constructor(private vertBarChartRenderer: Renderer2) {
    // Instead of manipulating the data object imported directly, do a deep copy and sort the copy,
    // Otherwise, all other graphs that imports the data object will be affected
    this.DATA = JSON.parse(JSON.stringify({SINGLE}));
    this.DATA = this.DATA['SINGLE'];
    // Deep clone a copy of the original data
    this.ORIGINAL_DATA = JSON.parse(JSON.stringify(this.DATA));
  }
  
  saveAsSvg() {
    this.svgSaver.asSvg(this.vertBarChart.chartElement.nativeElement);
  }

  ngOnInit() {
    this.barPadding = this.getPadding(this.elementView.nativeElement.offsetWidth);
    this.showLegend = this.elementView.nativeElement.offsetWidth > this.minShowLegendWindowWidth ? true : false;
    this.setSortOrderDesc();
  }

  ngAfterViewInit() {
    //console.log(this.vertBarChart.nativeElement); 
    //this.el.nativeElement.focus();
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
      minPadding: 12,
      maxPadding: 18,
      minWidth: 350,
      maxWidth: 450
    };

    return width > min_max.minWidth ? (( Math.min(width-min_max.minWidth, min_max.maxWidth-min_max.minWidth)/ (min_max.maxWidth-min_max.minWidth) ) * ( min_max.maxPadding - min_max.minPadding )) + min_max.minPadding : min_max.minPadding;
  }

  sortBy(field: string, orderAsc: boolean = false, primer?: (any) => any): ((a: any, b: any) => number) {
    let getValue = primer ? function(x) { return primer(x[field]) } : function(x) { return x[field] };
    let order = orderAsc ? 1 : -1;
    return function(a,b): number {
      return getValue(a) === getValue(b) ? 0 : getValue(a) > getValue(b) ? order : order * -1;
    };
  }

  setSortOrderAsce() {
    this.sortAsc = true;
    this.updateGraph();
  }

  setSortOrderDesc() {
    this.sortAsc = false;
    this.updateGraph();
  }

  toggleCollapseExtreme() {
    this.collapseExtreme = !this.collapseExtreme;
    this.updateGraph();
  }

  toggleShowPercentage() {
    this.showPercentage = !this.showPercentage;
    this.updateGraph();
  }

  updateGraph() {
    // Transform the data based on current settings
    this.DATA = this.transformData(this.getOriginalData());
    // Update the labels if necessary
    this.updateLabels();
    // Force a redraw
    this.DATA = [...this.DATA];
  }

  updateLabels() {
    this.yAxisLabel = this.showPercentage ? "% of Hours" : "Hours";
  }

  // Applies data transformation based on current set of settings, e.g. show %, collapse, sorted
  transformData(data: any[]): any[] {
    // apply sort first
    data = data.sort(this.sortBy('value', this.sortAsc));
    // apply collapse
    data = this.collapseExtreme ? this.collapse(data, 5) : data;
    // apply %
    data = this.showPercentage ? this.toPercentage(data) : data;
    
    return data;
  }

  collapse(data: any[], retain: number): any[] {
    // Deep copy
    let output = JSON.parse(JSON.stringify(data));
    // Sort the copy by value
    output.sort(this.sortBy('value', this.sortAsc));
    // Group the "Others" and find its sum
    let front = output.slice(0,retain);
    let back = output.slice(retain);
    let out = {};
    out['name'] = "Others";
    out['value'] = back.map(x => x.value).reduce( (a,b) => a+b, 0);
    return [...front, out];
  }

  // Input is an array/JSON of "name", "value" pair
  toPercentage(data: any[]): any[] {
    // Get total
    let sum = data.map(x => x.value).reduce( (a,b) => a+b );
    return data.map(x => JSON.parse(`{"name":"${x.name}", "value":${(x.value/sum)*100}}`));
  }

  getOriginalData(): any[] {
    return JSON.parse(JSON.stringify(this.ORIGINAL_DATA));
  }
}