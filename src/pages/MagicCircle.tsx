import React, { useEffect } from 'react';
import * as d3 from 'd3';

const MagicCircle = () => {
  useEffect(() => {
    drawChart();
    return () => {
      d3.select("svg").remove();
    };
  }, []);

  const drawChart = () => {
    const svg = d3
      .select('#circle-container')
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    // Append circle element - save reference so you can add other functionality later
    const circle = svg
      .append("circle")
      .attr("r", 50)
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("fill", "blue")
      .attr("stroke", "black");

    // Type-safe drag handler: this also shows how to move the cards in the later tree when the tree expands and contracts
    const dragHandler = d3.drag<SVGCircleElement, unknown>()
      .on('start', (event: d3.D3DragEvent<SVGCircleElement, unknown, unknown>) => {
        d3.select(event.sourceEvent.target as SVGCircleElement).attr('stroke', 'red');
      })
      .on('drag', (event: d3.D3DragEvent<SVGCircleElement, unknown, unknown>) => {
        d3.select(event.sourceEvent.target as SVGCircleElement)
          .attr('cx', event.x)
          .attr('cy', event.y);
      })
      .on('end', (event: d3.D3DragEvent<SVGCircleElement, unknown, unknown>) => {
        d3.select(event.sourceEvent.target as SVGCircleElement).attr('stroke', 'black');
      });

    dragHandler(circle);

    // Hover behavior
    circle
      .on('mouseover', function() {
        d3.select(this).attr('fill', 'orange');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', 'blue');
      });

    // Click behavior: needs to be integrated into the individual card elements to call the function to bring up the popup card
    circle.on('click', function() {
      alert('Circle clicked!');
    });
  };

  return (
    <div>
      <div>Circle!</div>
      <div id="circle-container"></div>
    </div>
  );
};

export default MagicCircle;
