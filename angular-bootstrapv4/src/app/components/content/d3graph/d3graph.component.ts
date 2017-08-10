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

  // Generate a color scheme
  //colorScheme = chroma.scale('Spectral').colors(7);

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
    var margin = { top: 5, right: 10, bottom: 5, left: 10};
    var innerGraphMargin = {left: 10, right: 10};

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
    var graphWidth = chartWidth - margin.left - margin.right;

    // Compute the mapping function for horizontal axis from input domain to output range
    var xScale = d3.scaleTime()
      .domain([0, chartWidth])
      // Leave margins on the left and right so that axis labels don't get chopped off
      .range([innerGraphMargin.left, graphWidth - innerGraphMargin.right]);

    /*
     Compute the mapping function for vertical axis from input domain to output range.
     Note that the range goes from graphHeight to 0, because the pixel origin is top-left, instead of bottom-left
     */
    var yScale = d3.scaleLinear()
      .range([graphHeight, 0])
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
      yScale.domain(d3.extent(yExtent));
      
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
          .attr('stroke', chroma(chroma.scale('Spectral').colors(1)[0]).darken(2))
          .attr('stroke-width', 1.5)
          // Set the fill attributes
          .attr('opacity', 0.8)
          .style('fill', chroma.scale('Spectral').colors(1)[0])
          // Populate the actual path, see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
            .attr('d', d3.area()
              // Set the curve interpolation type
              .curve(d3.curveBasis)
              // How to map the horizontal values
              .x( function(d, index, data) { console.log(xScale(d['date'])); return xScale(d['date']); } )
              .y0( function(d, index, data) { console.log(yScale(d['close'])); return yScale(d['close']); } )
              .y1( function(d, index, data) { return graphHeight; } )
              /*
              How to map the vertical values, note that y0 is a positive displacement from the graphMidPoint,
              which translates into a downward displacement (since the pixel origin is top-left instead of bottom-left)
              */
              //.y0( function(d, index, data) { return graphMidPoint + yScale(flatten(d)); } )
              //.y1( function(d, index, data) { return graphMidPoint - yScale(flatten(d)); } )
            );
          // Draw the x Axes
          d3.select(this).append('g')
            .attr('class', 'axis')
            // Shift the axis from the origin to the element mid-point
            .attr('transform', 'translate(0,' + 0 + ')')
            .call(xAxis)
          ;
          // Style the x Axes
          d3.select(this)
            .select('.axis path')
            .attr('stroke', chroma(chroma.scale('Spectral').colors(1)[0]).darken(2))
            .attr('shape-rendering', 'crispEdges');
          d3.select(this)
            .selectAll('.axis .tick line')
            .attr('stroke', chroma(chroma.scale('Spectral').colors(1)[0]).darken(2))
            .attr('shape-rendering', 'crispEdges');
          d3.select(this)
            .selectAll('.axis .tick text')
            .attr('fill', chroma(chroma.scale('Spectral').colors(1)[0]).darken(2));
          // Draw the y Axis
          d3.select(this).append('g')
            .attr('class', 'axis')
            // Shift the axis from the origin to the element mid-point
            .attr('transform', 'translate(' + 20 + ', 0)')
            .call(yAxis)
          ;
        })
        /*
        // Draw the SVG element
        .append('svg')
        // Draw the path element
        .append('path')
        // Set the class attribute
        .attr('class', 'path')
        // Set the stroke attributes
        .attr('stroke', chroma(chroma.scale('Spectral').colors(1)[0]).darken(2))
        .attr('stroke-width', 1.5)
        // Set the fill attributes
        .attr('opacity', 0.8)
        .style('fill', chroma.scale('Spectral').colors(1)[0])
        
        // Enter into the dataset and repeat the below for every subset
        .enter()
        .attr('d', line)
        */
    });
  }
}