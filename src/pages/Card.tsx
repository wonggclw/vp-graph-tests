import React, {useEffect} from 'react';
import * as d3 from 'd3';

const Card = () => {
    useEffect(() => {
      drawChart();
      //does cleanup so that svg is only on the page when you are on the right page
      return () =>{
        d3.select("svg").remove();
      };
    }, []);

    const drawChart = () => {
      const svg = d3
        .select("#card-test-container")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

      //attr always comes before style - good practice
      // draw the blank card
      let margin: number = 10;
      svg
        .append("rect")
        .attr("x", margin)
        .attr("y", margin)
        .attr("width", 300)
        .attr("height", 100)
        .attr("rx", 20)
        .attr("ry", 20)
        .style("fill", "white")
        .style("stroke", "#d4158a")
        .style("stroke-width", 4);

      //add the circle
      let centerOffset: number = 50
      svg
        .append("circle")
        .attr("cx", margin + centerOffset)
        .attr("cy", margin + centerOffset)
        .attr("r", 40)
        .style("fill", "none")
        .style("stroke", "#d4158a")
        .style("stroke-width", 4);

      // //add the image inside the circle, accounting for stroke size
      // svg
      //   .append("image")
      //   //.attr("xlink:href", "src\assets\DuckDucken.jpg")
      //   .attr("xlink:href", "./src/assets/DuckDucken.jpg")
      //   .attr("x", margin + centerOffset)
      //   .attr("y", margin + centerOffset)
      //   .attr("width", 100)
      //   .attr("height", 100)
      //   .attr("clip-path", "circle(100px)");

      // Define a circular clipPath container
    svg.append("defs")
      .append("clipPath")
      .attr("id", "cropCircle") // Set an ID for reference
      .append("circle")
      .attr("cx", margin + centerOffset)
        .attr("cy", margin + centerOffset)
        .attr("r", 40); // Circle with radius 100

// Append an image inside the circle using clip-path
    svg.append("image")
      .attr("xlink:href", "./src/assets/DuckDucken.jpg") // Replace with your image path
      .attr("x", 150) // Adjust x to position the image within the circle
      .attr("y", 150) // Adjust y to position the image within the circle
      .attr("width", 100) // Adjust width of the image
      .attr("height", 100) // Adjust height of the image
      .attr("clip-path", "url(#cropCircle)"); // Apply the circle clip-path

    }

    return (
      <div>
        <div>Card Test!</div>
        <div id = "card-test-container"></div>
      </div>
    );
  };
  
  export default Card;