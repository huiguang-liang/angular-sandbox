import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import * as chroma from 'chroma-js';
import * as d3 from "d3";
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'home-component',
  templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {

  // Color generator
  colorScheme = chroma.scale('Spectral').colors(7);
  colors = {
    kitchen: this.colorScheme[0],
    living_room: this.colorScheme[1],
    bathroom: this.colorScheme[2],
    bedroom: this.colorScheme[3],
    main_door: this.colorScheme[4],
    spare_room: this.colorScheme[5],
    med_box: this.colorScheme[6]
  }

  ngOnInit() {
    this.displayChart();
  }

  displayChart() {
    d3.select(".test-chart").selectAll("svg").remove();
    var container = this.drawDemoChart(d3.select(".test-chart"));
  }

  /**
   * Returns a flattened array.
   * @param x The object to be flattened
   * @return The flattened array if @param X is an array, else @param X
   */
  flatten = function(x) {
    return Array.isArray(x) ? x.reduce( (a, b) =>  a.concat(b) ) : x;
  }

  drawDemoChart(divElement) {

    // Random graph properties
    var setSize = 7;
    var setLength = 100;

    // Setup the chart margins
    var margin = { top: 5, right: 10, bottom: 5, left: 10};
    var innerGraphMargin = {left: 10, right: 10};

    // Find the enclosing div element dimensions
    var divElementWidth = parseInt(divElement.style("width")),
      divElementHeight = parseInt(divElement.style("width"));

    // Compute the chart dimension, extending the height if necessary
    var chartWidth = divElementWidth,
      chartHeight = Math.max(420, divElementHeight);
    
    // Setup the chart container within the divElement
    var container = divElement.append("div")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // Generate a random data set of size setSize, random data of length setLength
    var dataset = Array.from({length: setSize}, (v, k) => Array.from({length: setLength}, (v, k) => Math.floor(Math.random() * 100)));

    // Compute the max and min data results for scaling purposes
    var max = d3.max(dataset, x => d3.max(x)),
      min = d3.min(dataset, x => d3.min(x));
    
    // Compute the height of each graph element
    var graphHeight = chartHeight / setSize,
      graphMidPoint = graphHeight / 2,
      graphWidth = chartWidth - margin.left - margin.right;

    // Compute the mapping function for horizontal axis from input domain to output range
    var xScale = d3.scaleLinear()
      .domain([0, setLength])
      // Leave margins on the left and right so that axis labels don't get chopped off
      .range([innerGraphMargin.left, graphWidth - innerGraphMargin.right]);

    /*
     Compute the mapping function for vertical axis from input domain to output range.
     Note that the range goes from graphHeight to 0, because the pixel origin is top-left, instead of bottom-left
     */
    var yScale = d3.scaleLinear()
      .domain([-max, max])
      .range([graphHeight, 0]);


    // Define the xAxis
    var xAxis = d3.axisBottom(xScale);

    // Get the individual colors for each subset in the dataset
    var colors = chroma.scale('Spectral').colors(setSize);

    // Get a reference to the flatten function outside of d3's 'this' scope
    const flatten = this.flatten;

    // Finally, draw the elements, but 'demoChart' element will not exist for now
    container.selectAll(".demoChart")
      // Bind to the dataset
      .data(dataset)
      // Enter into the dataset and repeat the below for every subset
      .enter()
      // Draw the SVG element for each subset in the data
      .append('svg')
        // Set the individual SVG element dimension for each subset
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .style('display', 'block')
        .style('margin', '0 auto')
        // Call a function for each subset d, and its index i, with 'this' referencing the current DOM element 
        .each( function(d, i) {
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
            .attr('stroke', chroma(colors[i]).darken(2))
            .attr('stroke-width', 1.5)
            // Set the fill attributes
            .attr('opacity', 0.8)
            .style('fill', colors[i])
            // Populate the actual path, see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
            .attr('d', d3.area()
              // Set the curve interpolation type
              .curve(d3.curveBasis)
              // How to map the horizontal values
              .x( function(d, index, data) { return xScale(index); } )
              /*
              How to map the vertical values, note that y0 is a positive displacement from the graphMidPoint,
              which translates into a downward displacement (since the pixel origin is top-left instead of bottom-left)
              */
              .y0( function(d, index, data) { return graphMidPoint + yScale(flatten(d)); } )
              .y1( function(d, index, data) { return graphMidPoint - yScale(flatten(d)); } )
            );
          // Draw the x Axes
          d3.select(this).append('g')
            .attr('class', 'axis')
            // Shift the axis from the origin to the element mid-point
            .attr('transform', 'translate(0,' + graphMidPoint + ')')
            .call(xAxis)
          ;
          // Style the x Axes
          d3.select(this)
            .select('.axis path')
            .attr('stroke', chroma(colors[i]).darken(2))
            .attr('shape-rendering', 'crispEdges');
          d3.select(this)
            .selectAll('.axis .tick line')
            .attr('stroke', chroma(colors[i]).darken(2))
            .attr('shape-rendering', 'crispEdges');
          d3.select(this)
            .selectAll('.axis .tick text')
            .attr('fill', chroma(colors[i]).darken(2));
        });
  }
}
