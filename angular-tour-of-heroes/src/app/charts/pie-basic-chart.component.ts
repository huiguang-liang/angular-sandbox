import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { SINGLE } from './vert-bar-chart.data';
import * as chroma from 'chroma-js';
import { HelperService } from '../helpers.service';
import * as SvgSaver from 'svgsaver';

@Component({
  selector: 'pie-basic-chart',
  templateUrl: './pie-basic-chart.component.html',
})

export class PieBasicChartComponent implements OnInit {

  @ViewChild('panel') elementView: ElementRef;
  @ViewChild('pieBasicChart') pieBasicChart;

  DATA: any[];
  ORIGINAL_DATA: any[];

  view = undefined;

  // options
  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  
  minShowLegendWindowWidth = 400;
  collapseExtreme = false;
  showPercentage = false;

  sortAsc = true;

  colorScheme = {
    domain: chroma.scale(['#97749C','#E2E062']).mode('lch').colors(6)
  };

  svgSaver = new SvgSaver();

  constructor(private helperService: HelperService) {
    // Instead of manipulating the data object imported directly, do a deep copy and sort the copy,
    // Otherwise, all other graphs that imports the data object will be affected
    this.DATA = JSON.parse(JSON.stringify({SINGLE}));
    this.DATA = this.DATA['SINGLE'];
    // Deep clone a copy of the original data
    this.ORIGINAL_DATA = JSON.parse(JSON.stringify(this.DATA));
    // apply sort
    this.DATA = this.DATA.sort(this.helperService.sortBy('value', this.sortAsc));
  }
  
  saveAsSvg() {
    this.svgSaver.asSvg(this.pieBasicChart.chartElement.nativeElement);
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

  toggleCollapseExtreme() {
    this.collapseExtreme = !this.collapseExtreme;
    this.updateGraph();
  }

  toggleShowPercentage() {
    this.showPercentage = !this.showPercentage;
    this.updateGraph();
  }

  toggleShowExplode() {
    this.explodeSlices = this.doughnut ? false : !this.explodeSlices;
  }

  toggleShowDoughnut() {
    this.doughnut = this.explodeSlices ? false : !this.doughnut;
  }

  updateGraph() {
    // Transform the data based on current settings
    this.DATA = this.transformData(this.getOriginalData());
    // Force a redraw
    this.DATA = [...this.DATA];
  }

  // Applies data transformation based on current set of settings, e.g. show %, collapse
  transformData(data: any[]): any[] {
    // Apply sort
    data = data.sort(this.helperService.sortBy('value', this.sortAsc));
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
    output.sort(this.helperService.sortBy('value', !this.sortAsc));
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