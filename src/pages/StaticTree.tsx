import React, { useEffect } from 'react';
import * as d3 from 'd3';

const StaticTree = () => {
  useEffect(() => {
    drawChart();
    //does cleanup so that svg is only on the page when you are on the right page
    return () => {
        d3.select("svg").remove();
      };
  }, []); // Empty dependency array ensures this runs only once after initial render

  const drawChart = () => {
    const svg = d3
      .select('#tree-container')
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
        <div>Static basic version of real tree</div>
        <div id="tree-container"></div>
    </div>
  ); 
};

export default StaticTree;