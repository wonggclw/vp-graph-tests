import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Card from './helperClasses/Card';

const VersionOne = () => {
  useEffect(() => {
    return () => {
      d3.select("svg").remove();
    };
  }, []);

  return (
    <div>
      <div className='w-screen border-4 border-sky-300'>If you can read this, you can read!</div>
      <div id="tree-contain"></div>
    </div>
  );
};


export default VersionOne;

function drawCard(info: Card){
    //attr always comes before style - good practice
    // draw the blank card
    let cardHeight: number = (1/3) * (info.width);
    let cornerRound: number = (1/15) * (info.width);
    let strokeWidth: number = (1/75) * (info.width);

    let cardColor: string = "#d4d4d4";
    let cardImg: string = "src/assets/virtualPedigreeCard/question-mark-53.png";

    if(info.gender == "F"){
      cardColor = "#d4158a";
      cardImg = "src/assets/virtualPedigreeCard/Female_icon.png";
    }
    if(info.gender == "M"){
      cardColor = "#1873a3"
      cardImg = "src/assets/virtualPedigreeCard/Male_icon.png";
    }

    if(imgSrc != "none"){
      cardImg = imgSrc;
    }

    const svg = d3.select("#mainContain");
    const g = svg.append("g")
      .attr("id", pid)
      .attr("width", width + strokeWidth)
      .attr("height", cardHeight + strokeWidth)
      .attr("x", xcoord)
      .attr("y", ycoord);

    g
      .append("rect")
      .attr("x", xcoord)
      .attr("y", ycoord)
      .attr("width", cardWidth)
      .attr("height", cardHeight)
      .attr("rx", cornerRound)
      .attr("ry", cornerRound)
      .style("fill", "white")
      .style("stroke", cardColor)
      .style("stroke-width", strokeWidth);


    
    let circleCenterOffset: number = (1/6) * (cardWidth);
    let circleRadius: number = (2/15) * (cardWidth);
    g
      .append("circle")
      .attr("cx", xcoord + circleCenterOffset)
      .attr("cy", ycoord + circleCenterOffset)
      .attr("r", circleRadius)
      .style("fill", "none")
      .style("stroke", cardColor)
      .style("stroke-width", strokeWidth);

  
  // Define a circular clipPath container
  let clipRad: number = circleRadius - ((1/2) * strokeWidth);
  
  g.append("defs")
    .append("clipPath")
    .attr("id", "cropCircle") // Set an ID for reference
    .append("circle")
    .attr("cx", xcoord + circleCenterOffset)
    .attr("cy", ycoord + circleCenterOffset)
    .attr("r", clipRad); // Circle with radius 98 so you can see the pink line

  // Append an image inside the circle using clip-path
  let imgContainWidth: number = (1/3) * cardWidth;
  let imgContainHeight: number = imgContainWidth;

  g.append("image")
    .attr("xlink:href", cardImg) // Replace with your image path
    .attr("x", xcoord) // Adjust x to position the image within the circle
    .attr("y", ycoord) // Adjust y to position the image within the circle
    .attr("width", imgContainWidth) // Adjust width of the image
    .attr("height", imgContainHeight) // Adjust height of the image
    .attr("preserveAspectRatio", "xMidYMid slice")// makes it so the image is fixed to its normal aspect ratio
    .attr("clip-path", "url(#cropCircle)"); // Apply the circle clip-path

  let textX: number = (2/5) * (cardWidth) + xcoord;
  let YName: number = (1/6) * cardWidth + ycoord;
  let YDate: number = (7/30) * cardWidth + ycoord;

  let nameTextSize: number = (2/25) * cardWidth;
  let dateTextSize: number = (1/20) * cardWidth;

  g.append("text")
    .attr("x", textX)          // Set the x position of the text
    .attr("y", YName)           // Set the y position of the text
    .attr("font-family", "sans-serif")  // Set font family
    .attr("font-size", nameTextSize)          // Set font size
    .attr("font-weight", "bold")   
    .attr("fill", cardColor)              // Set text color
    //NOTE: this will not work for cultures where the name is in the other order
    .text(firstName + " " + lastName); // not sure how this looks exactly coming from FamilySearch yet... do I need to concat first + last names?
  
  g.append("text")
    .attr("x", textX)          // Set the x position of the text
    .attr("y", YDate)           // Set the y position of the text
    .attr("font-family", "sans-serif")  // Set font family
    .attr("font-size", dateTextSize)          // Set font size
    .attr("fill", cardColor)              // Set text color
    .text(birthYear + " - " + deathYear); // Definitely will need to concat for this later
  }