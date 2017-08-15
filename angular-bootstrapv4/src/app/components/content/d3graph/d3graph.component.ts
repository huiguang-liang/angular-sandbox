import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import * as d3 from 'd3';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'd3graph-component',
  templateUrl: 'd3graph.component.html',
})

export class D3graphComponent implements OnInit {

  lastResized = Date.now();

  constructor() { }

  ngOnInit() {
    this.displayChart();
  }

  displayChart() {
    d3.select(".test-chart").selectAll("svg").remove();
    var container = this.drawDemoChart(d3.select(".test-chart"));
  }

  drawDemoChart(divElement) {
    // Setup the chart margins
    var margin = { top: 20, right: 20, bottom: 40, left: 40};
    var innerGraphMargin = {left: 10, right: 10};

    // Setup the base chart color
    var baseColor = chroma.scale('Spectral').colors(3)[2];
    var axesColor = chroma(baseColor).darken(2);

    // Find the enclosing div element dimensions
    var divElementWidth = parseInt(divElement.style("width"));
    var divElementHeight = parseInt(divElement.style("height"));

    // Compute the chart dimension, extending the height if necessary
    var chartWidth = divElementWidth;
    var chartHeight = Math.max(400, divElementHeight);

    // Setup the chart container within the divElement
    var container = divElement.append("div")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    
    var graphHeight = chartHeight;
    var graphWidth = chartWidth;

    // Compute the mapping function for horizontal axis from input domain to output range
    var xScale = d3.scaleTime()
      .domain([0, graphWidth])
      // Leave margins on the left and right so that axis labels don't get chopped off
      .range([margin.left, graphWidth - margin.right]);

    /*
     Compute the mapping function for vertical axis from input domain to output range.
     Note that the range goes from graphHeight to 0, because the pixel origin is top-left, instead of bottom-left
     */
    var yScale = d3.scaleLinear()
      // Leave margins on the top and bottom so that axis labels don't get chopped off
      .range([graphHeight - margin.bottom, margin.top])
      .nice();

    // Define the xAxis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Load the dataset and draw the elements
    d3.csv('./assets/d3graph/d3graph.data.csv', function(data) {
      var dataset = data.map(d => {
        var newObj = {};
        newObj['date'] = d3.timeParse("%Y-%m-%d")(d.date);
        newObj['close'] = +d.close;
        return newObj;
      });

      // Update the xScale and yScale
      var xExtent: number[] = dataset.map(d => d['date']);
      var yExtent: number[] = dataset.map(d => d['close']);
      xScale.domain(d3.extent(xExtent));
      // Add some allowances to the y-axis extent
      yScale.domain([d3.extent(yExtent)[0]-10, d3.extent(yExtent)[1]+10]).nice();

      // Update the axes ticks
      var xAxisTicks = chartWidth > 600 ? null : 5;
      xAxis.ticks(xAxisTicks);

      container.selectAll(".demoChart")
        // Bind to the dataset
        .data([dataset])
        // Enter into the dataset and repeat the below for every subset
        .enter()
        // Draw the SVG element
        .append('svg')
        // Set the individual SVG element dimension for each subset
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .style('display', 'block')
        .style('margin', '0 auto')
        // Call a function for each subset d, and its index i, with 'this' referencing the current DOM element 
        .each( function(d, i) {
          //console.log(d, i);
          // Draw entry for each subset, but the 'demoEntry' element will not exist for now
          d3.select(this).selectAll(".demoEntry")
          // Bind to the subset [d]
          .data([d])
          // Enter into the dataset and repeat the below
          .enter()
          // Draw the path element
          .append('path')
          // Set the class attribute
          .attr('class', 'path')
          // Set the stroke attributes
          .attr('stroke', baseColor)
          .attr('stroke-width', 1.5)
          // Set the fill attributes
          .attr('opacity', 1.0)
          .style('fill', 'none')
          // Populate the actual path, see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
          // .attr('d', d3.area()
          //   // Set the curve interpolation type
          //   .curve(d3.curveBasis)
          //   // How to map the horizontal values
          //   .x( function(d, index, data) { return xScale(d['date']); } )
          //   .y0( function(d, index, data) { return yScale(d['close']); } )
          //   .y1( function(d, index, data) { return graphHeight - margin.bottom; } )
          // );
          .attr('d', d3.line()
            .curve(d3.curveLinear)
            .x(d => xScale(d['date']))
            .y(d => yScale(d['close']))
          )
          
          // Draw the x Axis
          d3.select(this).append('g')
            .attr('class', 'x-axis')
            // Shift the axis from the origin to the element mid-point
            .attr('transform', 'translate(0,' + (graphHeight - margin.bottom) + ')')
            .call(xAxis)
          // Style the x Axes
          d3.select(this).select('.x-axis .domain')
            .attr('stroke', axesColor)
            .attr('shape-rendering', 'crispEdges')
          d3.select(this).selectAll('.x-axis .tick line')
            .attr('stroke', axesColor)
            .attr('shape-rendering', 'crispEdges')
          d3.select(this).selectAll('.x-axis .tick text')
            .attr('fill', axesColor);
          
          // Draw the y Axis
          d3.select(this).append('g')
            .attr('class', 'y-axis')
            // Shift the axis from the origin to the element mid-point
            .attr('transform', 'translate(' + margin.left + ', 0)')
            .call(yAxis)
          // Style the y Axes
          d3.select(this).select('.y-axis .domain')
            .attr('stroke', axesColor)
            .attr('shape-rendering', 'crispEdges')
          d3.select(this).selectAll('.y-axis .tick line')
            .attr('stroke', axesColor)
            .attr('shape-rendering', 'crispEdges')
          d3.select(this).selectAll('.y-axis .tick text')
            .attr('fill', axesColor);

          // Create the x-axis label
          d3.select(this).append('g')
            .attr('class', 'axis-labels')
              .append('text')
              .attr('transform', 'translate(' + (chartWidth - margin.right) + ', ' + (chartHeight - margin.bottom - 10) + ')')
              .style('text-anchor', 'end')
              .text('Date')
          // Create the y-axis label
          d3.select(this).select('.axis-labels')
            .append('text')
            // .attr('transform', 'rotate(-90)')
            .attr('transform', 'translate(' + (margin.left + 20) + ', ' + (margin.top) + ') rotate(-90)')
            .style("text-anchor", "end")
            .text("Closing Value ($)")
          
          
        })
    });
  }

  onResize(event) {
    //console.log(event.width);
    if ((Date.now() - this.lastResized) > 500) {
      console.log(event.width);

      this.displayChart();
      this.lastResized = Date.now();
    }
  }
}