import React, {useEffect} from 'react';
import * as d3 from 'd3';

interface CardProps{
    width: number;
    firstName: string;
    lastName: string;
    birthYear: string;
    deathYear?: string;
    imgSrc?: string;
    xcoord?: number;
    ycoord?: number;
}

const DynamicCard: React.FC<CardProps> = ({width, firstName, lastName, birthYear, deathYear = "Living", imgSrc="none", xcoord=0, ycoord=0}) => {
    useEffect(() => {
      drawChart();
      drawCard(300);
      //does cleanup so that svg is only on the page when you are on the right page
      return () =>{
        d3.select("svg").remove();
      };
    }, []);

    function drawCard(width: number){
      //attr always comes before style - good practice
      // draw the blank card
      let YName: number = 60;
      let XName: number = 120;
      let YDate: number = 80;
      let XDate: number = 120;

      const svg = d3.select("#mainContain");

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

    // Define a circular clipPath container
    svg.append("defs")
      .append("clipPath")
      .attr("id", "cropCircle") // Set an ID for reference
      .append("circle")
      .attr("cx", margin + centerOffset)
      .attr("cy", margin + centerOffset)
      .attr("r", 39); // Circle with radius 98 so you can see the pink line

    // Append an image inside the circle using clip-path
    svg.append("image")
      .attr("xlink:href", "./src/assets/DuckDucken.jpg") // Replace with your image path
      //might want to fix this later so that the image is more centered
      .attr("x", 10) // Adjust x to position the image within the circle
      .attr("y", 10) // Adjust y to position the image within the circle
      .attr("width", 100) // Adjust width of the image
      .attr("height", 100) // Adjust height of the image
      .attr("clip-path", "url(#cropCircle)"); // Apply the circle clip-path

    svg.append("text")
      .attr("x", XName)          // Set the x position of the text
      .attr("y", YName)           // Set the y position of the text
      .attr("font-family", "sans-serif")  // Set font family
      .attr("font-size", "24px")          // Set font size
      .attr("font-weight", "bold")   
      .attr("fill", "#d4158a")              // Set text color
      .text("Duck Ducken"); // not sure how this looks exactly coming from FamilySearch yet... do I need to concat first + last names?
    
    svg.append("text")
      .attr("x", XDate)          // Set the x position of the text
      .attr("y", YDate)           // Set the y position of the text
      .attr("font-family", "sans-serif")  // Set font family
      .attr("font-size", "15px")          // Set font size
      .attr("fill", "#d4158a")              // Set text color
      .text("1842 - 1927"); // Definitely will need to concat for this later
    }

    const drawChart = () => {
      d3
        .select("#card-test-container")
        .append("svg")
        .attr("id", "mainContain")
        .attr("width", 500)
        .attr("height", 500);
    }

    return (
      <div>
        <div id = "card-test-container" className="border-4 border-sky-300"></div>
      </div>
    );
  };
  
  export default DynamicCard;