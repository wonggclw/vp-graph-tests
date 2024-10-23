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

const CardComp: React.FC<CardProps> = ({width, firstName, lastName, birthYear, deathYear = "Living", imgSrc="none", xcoord=0, ycoord=0}) => {
    useEffect(() => {
      drawChart();
      drawCard(300);
      //does cleanup so that svg is only on the page when you are on the right page
      return () =>{
        d3.select("svg").remove();
      };
    }, []);

    // eventually add an id so that each card can be referenced later. Append a group to svg later.
    function drawCard(cardWidth: number){
      //attr always comes before style - good practice
      // draw the blank card
      let cardHeight: number = (1/3) * (cardWidth);
      let cornerRound: number = (1/15) * (cardWidth);
      let strokeWidth: number = (1/75) * (cardWidth);

      const svg = d3.select("#mainContain");

      svg
        .append("rect")
        .attr("x", xcoord)
        .attr("y", ycoord)
        .attr("width", cardWidth)
        .attr("height", cardHeight)
        .attr("rx", cornerRound)
        .attr("ry", cornerRound)
        .style("fill", "white")
        .style("stroke", "#d4158a")
        .style("stroke-width", strokeWidth);


      
      let circleCenterOffset: number = (1/6) * (cardWidth);
      let circleRadius: number = (2/15) * (cardWidth);
      svg
        .append("circle")
        .attr("cx", xcoord + circleCenterOffset)
        .attr("cy", ycoord + circleCenterOffset)
        .attr("r", circleRadius)
        .style("fill", "none")
        .style("stroke", "#d4158a")
        .style("stroke-width", strokeWidth);

    // Define a circular clipPath container
    svg.append("defs")
      .append("clipPath")
      .attr("id", "cropCircle") // Set an ID for reference
      .append("circle")
      .attr("cx", xcoord + circleCenterOffset)
      .attr("cy", ycoord + circleCenterOffset)
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

    let textX: number = (2/5) * (cardWidth);
    //TODO: make these dynamic
    let YName: number = 60;
    let YDate: number = 80;

    svg.append("text")
      .attr("x", textX)          // Set the x position of the text
      .attr("y", YName)           // Set the y position of the text
      .attr("font-family", "sans-serif")  // Set font family
      .attr("font-size", "24px")          // Set font size
      .attr("font-weight", "bold")   
      .attr("fill", "#d4158a")              // Set text color
      .text("Duck Ducken"); // not sure how this looks exactly coming from FamilySearch yet... do I need to concat first + last names?
    
    svg.append("text")
      .attr("x", textX)          // Set the x position of the text
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
        <div id = "card-test-container" className="border-4 border-sky-300"></div>
    );
  };
  
  export default CardComp;