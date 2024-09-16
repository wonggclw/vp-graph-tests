import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  useEffect(() => {
    drawChart();
    //does cleanup so that svg is only on the page when you are on the right page
    return () => {
        d3.select("svg").remove();
      };
  }, []); // Empty dependency array ensures this runs only once after initial render

  const drawChart = () => {
    const svg = d3
      .select('#bar-chart-container')
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    svg
      .append("text")
      .attr("x", 100)
      .attr("y", 100)
      .text("Hello d3js");

    svg
      .append("circle")
      .attr("r", 30)
      .attr("cx", 60)
      .attr("cy", 50);
  };

  return(
    <div>
        <div>BarChart!</div>
        <div id="bar-chart-container"></div>
    </div>
  ); // This component doesn't render anything directly in JSX
};

export default BarChart;