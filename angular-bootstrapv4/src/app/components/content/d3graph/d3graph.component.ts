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
            .attr('transform', 'translate(' + (margin.left + 20) + ', ' + (margin.top) + ') rotate(-90)')
            .style("text-anchor", "end")
            .text("Closing Value ($)")

          // Draw the legend
          let legend = d3.select(this).append('g');
          // Displace the whole legend
          legend.attr('transform', 'translate(' + (margin.left + 80) + ', ' + (margin.top + 20) + ')');
          legend.attr('class', 'legend')
            .append('text')
            .style('text-anchor', 'start')
            .text('YHOO');
          let boundingBox = (legend.node() as any).getBBox();
          // Draw the reference line
          legend.append('line')
            .attr("x1", boundingBox.x - 30)
            .attr("x2", boundingBox.x - 10)
            .attr("y1", boundingBox.y + (boundingBox.height/2))
            .attr("y2", boundingBox.y + (boundingBox.height/2))
            .attr('stroke', axesColor)
          // Draw the bounding rectangle
          boundingBox = (legend.node() as any).getBBox();
          let padding = 10;
          legend.append('rect')
            .attr("x", boundingBox.x - padding)
            .attr("y", boundingBox.y - padding)
            .attr("width", boundingBox.width + (padding * 2))
            .attr("height", boundingBox.height + (padding * 2))
            .attr('stroke', axesColor)
            .attr('shape-rendering', 'crispEdges')
            .style('fill', 'none');
          
          // Draw the marks
          boundingBox = (legend.node() as any).getBBox();

          // Left marks
          legend.append('line')
            .attr('x1', boundingBox.x - 5)
            .attr('x2', boundingBox.x + 5)
            .attr('y1', boundingBox.y)
            .attr('y2', boundingBox.y)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          legend.append('line')
            .attr('x1', boundingBox.x)
            .attr('x2', boundingBox.x)
            .attr('y1', boundingBox.y - 5)
            .attr('y2', boundingBox.y + 5)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          
          legend.append('line')
            .attr('x1', boundingBox.x - 5)
            .attr('x2', boundingBox.x + 5)
            .attr('y1', boundingBox.y + boundingBox.height)
            .attr('y2', boundingBox.y + boundingBox.height)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          legend.append('line')
            .attr('x1', boundingBox.x)
            .attr('x2', boundingBox.x)
            .attr('y1', boundingBox.y + boundingBox.height - 5)
            .attr('y2', boundingBox.y + boundingBox.height + 5)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')

          // Middle Marks
          legend.append('line')
            .attr('x1', boundingBox.x + (boundingBox.width / 2) - 5)
            .attr('x2', boundingBox.x + (boundingBox.width / 2) + 5)
            .attr('y1', boundingBox.y)
            .attr('y2', boundingBox.y)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          legend.append('line')
            .attr('x1', boundingBox.x + (boundingBox.width / 2) )
            .attr('x2', boundingBox.x + (boundingBox.width / 2) )
            .attr('y1', boundingBox.y - 5)
            .attr('y2', boundingBox.y + 5)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          
          legend.append('line')
            .attr('x1', boundingBox.x + (boundingBox.width / 2) - 5)
            .attr('x2', boundingBox.x + (boundingBox.width / 2) + 5)
            .attr('y1', boundingBox.y + boundingBox.height)
            .attr('y2', boundingBox.y + boundingBox.height)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')
          legend.append('line')
            .attr('x1', boundingBox.x + (boundingBox.width / 2) )
            .attr('x2', boundingBox.x + (boundingBox.width / 2) )
            .attr('y1', boundingBox.y + boundingBox.height - 5)
            .attr('y2', boundingBox.y + boundingBox.height + 5)
            .attr('stroke', 'red')
            .attr('shape-rendering', 'crispEdges')

          // Right Marks
          legend.append('line')
          .attr('x1', boundingBox.x + boundingBox.width - 5)
          .attr('x2', boundingBox.x + boundingBox.width + 5)
          .attr('y1', boundingBox.y)
          .attr('y2', boundingBox.y)
          .attr('stroke', 'red')
          .attr('shape-rendering', 'crispEdges')
        legend.append('line')
          .attr('x1', boundingBox.x + boundingBox.width )
          .attr('x2', boundingBox.x + boundingBox.width )
          .attr('y1', boundingBox.y - 5)
          .attr('y2', boundingBox.y + 5)
          .attr('stroke', 'red')
          .attr('shape-rendering', 'crispEdges')
        
        legend.append('line')
          .attr('x1', boundingBox.x + boundingBox.width - 5)
          .attr('x2', boundingBox.x + boundingBox.width + 5)
          .attr('y1', boundingBox.y + boundingBox.height)
          .attr('y2', boundingBox.y + boundingBox.height)
          .attr('stroke', 'red')
          .attr('shape-rendering', 'crispEdges')
        legend.append('line')
          .attr('x1', boundingBox.x + boundingBox.width )
          .attr('x2', boundingBox.x + boundingBox.width )
          .attr('y1', boundingBox.y + boundingBox.height - 5)
          .attr('y2', boundingBox.y + boundingBox.height + 5)
          .attr('stroke', 'red')
          .attr('shape-rendering', 'crispEdges')

        // Label the legend
        //boundingBox = (legend.node() as any).getBBox();
        let legendLabel = legend.append('text')
          .attr('class', 'legend-label')
          .attr('text-anchor', 'middle')
          .text('Legend');
        let legendLabelBoundingBox = (d3.select(this).select('.legend-label').node() as any).getBBox();

        /*
        legend.append('rect')
          .attr('x', legendLabelBoundingBox.x)
          .attr('y', legendLabelBoundingBox.y)
          .attr('width', legendLabelBoundingBox.width)
          .attr('height', legendLabelBoundingBox.height)
          .style('fill', 'none')
          .attr('stroke', axesColor)
        */

        // Find the mid anchor point of the outer bounding box
        let midX = boundingBox.x + (boundingBox.width / 2);
        let midY = boundingBox.y + (boundingBox.height / 2);

        legend.append('line')
        .attr('x1', midX - 5)
        .attr('x2', midX + 5)
        .attr('y1', midY)
        .attr('y2', midY)
        .attr('stroke', 'red')
        .attr('shape-rendering', 'crispEdges')
        legend.append('line')
        .attr('x1', midX )
        .attr('x2', midX )
        .attr('y1', midY - 5)
        .attr('y2', midY + 5)
        .attr('stroke', 'red')
        .attr('shape-rendering', 'crispEdges')

        // Find current displacement of the legend label
        let labelMidX = legendLabelBoundingBox.x + (legendLabelBoundingBox.width / 2);
        let labelMidY = legendLabelBoundingBox.y + (legendLabelBoundingBox.height / 2);
        
        /*
        legend.append('line')
        .attr('x1', labelMidX - 5)
        .attr('x2', labelMidX + 5)
        .attr('y1', labelMidY)
        .attr('y2', labelMidY)
        .attr('stroke', 'green')
        .attr('shape-rendering', 'crispEdges')
        legend.append('line')
        .attr('x1', labelMidX )
        .attr('x2', labelMidX )
        .attr('y1', labelMidY - 5)
        .attr('y2', labelMidY + 5)
        .attr('stroke', 'green')
        .attr('shape-rendering', 'crispEdges')
        */

        // Find the difference
        let diffX = labelMidX - midX;
        let diffY = labelMidY - midY;

        // Update the bbox
        legendLabelBoundingBox = (d3.select(this).select('.legend-label').node() as any).getBBox();
        legend.append('rect')
          .attr('x', legendLabelBoundingBox.x)
          .attr('y', legendLabelBoundingBox.y)
          .attr('width', legendLabelBoundingBox.width)
          .attr('height', legendLabelBoundingBox.height)
          .style('fill', 'none')
          .attr('stroke', axesColor)
        
        // Shift Legend to center
        legendLabel.attr('transform', 'translate(' + (-1 * diffX) + ', ' + ((-1 * diffY) - (boundingBox.height / 2) ) + ')' );
        
          /*
          legend.append('text')
            .attr('class', 'legend-label')
            // .attr('transform', 'translate(' + 0 + ', ' + (-1 * boundingBox.height/2) + ')')
            .style('text-anchor', 'middle')
            .text('Legend');
          // Compute the dimension of the label
          let legendLabelBoundingBox = (d3.select(this).select('.legend-label').node() as any).getBBox();
          legend.append('rect')
          .attr('x', legendLabelBoundingBox.x)
          .attr('y', legendLabelBoundingBox.y)
          .attr('width', legendLabelBoundingBox.width)
          .attr('height', legendLabelBoundingBox.height)
          .style('fill', 'none')
          .attr('stroke', axesColor)
          */

          // // Remove the label
          // d3.select(this).select('legend-label').remove();
          // // Draw the background rectangle for the label
          // legend.append('rect')
          //   .attr('x', legendLabelBoundingBox.x - 1)
          //   .attr('y', legendLabelBoundingBox.y - 1)
          //   .attr('width', legendLabelBoundingBox.width + 2)
          //   .attr('height', legendLabelBoundingBox.height + 2)
          //   .attr('transform', 'translate(' + 0 + ', ' + (-1 * boundingBox.height/2) + ')')
          //   .attr('stroke', 'none')
          //   .style('fill', '#ffffff')
          //   .attr('z', -1);
          // // Finally, add back the legend label
          // legend.append('text')
          // .attr('class', 'legend-label')
          // .attr('transform', 'translate(' + 0 + ', ' + (-1 * boundingBox.height/2) + ')')
          // .style('text-anchor', 'middle')
          // .text('Legend');
          
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

  addMark(selection: any, x: number, y: number) {
    selection.append('line')
    .attr('x1', x - 5)
    .attr('x2', x + 5)
    .attr('y1', y)
    .attr('y2', y)
    .attr('stroke', 'red')
    .attr('shape-rendering', 'crispEdges')
    selection.append('line')
    .attr('x1', x )
    .attr('x2', x )
    .attr('y1', y - 5)
    .attr('y2', y + 5)
    .attr('stroke', 'red')
    .attr('shape-rendering', 'crispEdges')
    return selection;
  }
}