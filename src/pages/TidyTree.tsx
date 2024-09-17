import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TidyTree = () => {
  useEffect(() => {
    drawChart();
    // clean up the svg when tab switches
    return () => {
      d3.select("svg").remove();
    };
  }, []); // Empty dependency array ensures this runs only once after initial render

  const drawChart = () => {
    interface Country {
      name: string;
      children?: Country[];
    }

    // Wrap the array in a single root node
    let jsonData: Country = {
      name: "World",
      children: [
        {
          name: "Vietnam",
          children: [
            {
              name: "Saigon",
              children: []
            }
          ]
        },
        {
          name: "India",
          children: [
            {
              name: "Mumbai",
              children: []
            }
          ]
        }
      ]
    };

    // Set dimensions
    const width = 600;
    const height = 400;

    // Create an SVG container
    const svg = d3
      .select("#tidy-tree-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Append groups for nodes and links
    svg.append("g").classed("links", true);
    svg.append("g").classed("nodes", true);

    // Set up tree layout
    const treeLayout = d3.tree<Country>().size([width - 100, height - 100]);
    const root = d3.hierarchy<Country>(jsonData);
    treeLayout(root);

    // Draw lines
    d3.select("svg g.links")
      .selectAll("line.link")
      .data(root.links())
      .join("line")
      .classed("link", true)
      .style("stroke", "black")
      .attr('x1', d => (d.source as d3.HierarchyPointNode<Country>).x)
      .attr('y1', d => (d.source as d3.HierarchyPointNode<Country>).y)
      .attr('x2', d => (d.target as d3.HierarchyPointNode<Country>).x)
      .attr('y2', d => (d.target as d3.HierarchyPointNode<Country>).y);

    // Draw nodes
    d3.select("svg g.nodes")
      .selectAll("circle.node")
      .data(root.descendants())
      .join("circle")
      .classed("node", true)
      .attr("cx", d => (d as d3.HierarchyPointNode<Country>).x)
      .attr("cy", d => (d as d3.HierarchyPointNode<Country>).y)
      .attr("r", 10)
      .style("fill", "steelblue");
  };

  return (
    <div>
      <div>TidyTree!</div>
      <div id="tidy-tree-container"></div>
    </div>
  );
};

export default TidyTree;