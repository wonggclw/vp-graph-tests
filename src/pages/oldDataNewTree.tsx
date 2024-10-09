import React, {useEffect} from 'react';
import * as d3 from 'd3';

const OldDataNewTree = () => {
  
    useEffect(() => {
      drawChart();
      //does cleanup so that svg is only on the page when you are on the right page
      return () =>{
        d3.select("svg").remove();
      };
    }, []);

    const drawChart = () => {

    // Might set up the links to be different later, this works for now (look at the old tree)
    interface Person {
        firstName: string;
        lastName: string;
        born: number;
        died: number;
        img: string;
        gender: string;
        parents?: Person[];
    }

    // Tree data - wrap the array in a single root node
    let jsonData: Person = {
        firstName: "Duck",
        lastName: "Ducken",
        born: 1887,
        died: 1998,
        img: "./src/assets/DuckDucken.jpg",
        gender: "F",
        parents: [
            {
                firstName: "Drake",
                lastName: "Ducken",
                born: 1828,
                died: 1900,
                img: "./src/assets/DuckDucken.jpg",
                gender: "M",
                parents: [{
                    firstName: "Splash",
                    lastName: "Ducken",
                    born: 1798,
                    died: 1885,
                    img: "./src/assets/DuckDucken.jpg",
                    gender: "M"
                },
                {
                    firstName: "Puddles",
                    lastName: "Quackington",
                    born: 1800,
                    died: 1887,
                    img: "./src/assets/DuckDucken.jpg",
                    gender: "F"
                }]
            },
            {
                firstName: "Daisy",
                lastName: "Mallard",
                born: 1825,
                died: 1899,
                img: "./src/assets/DuckDucken.jpg",
                gender: "F",
                parents: [{
                    firstName: "Flap",
                    lastName: "Mallard",
                    born: 1798,
                    died: 1880,
                    img: "./src/assets/DuckDucken.jpg",
                    gender: "M"
                },
                {
                    firstName: "Daphne",
                    lastName: "Webington",
                    born: 1803,
                    died: 1890,
                    img: "./src/assets/DuckDucken.jpg",
                    gender: "F"
                }]
            }
        ]
    };

    // all the variables that control all the things
    let canvasWidth: number = 500;
    let canvasHeight: number = 500;
    const canvasMargin = {top: 0, right: 0, bottom: 0, left: 0};
    let treeWidth: number = canvasWidth - canvasMargin.left - canvasMargin.right;
    let treeHeight: number = canvasHeight - canvasMargin.top - canvasMargin.bottom;

    // create container for tree
    const svg = d3
      .select("#ctree-container")
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight);
    
    // create the tree rules
    const tree = d3.tree<Person>()
      .separation((a, b) => ((a.parent === b.parent) ? 1 : 0.5))
      .size([treeHeight, treeWidth])

    //this wraps the tree in a g element. 
    // Makes it easier to move to where you want to start and helps with dragging.
      const mainG = svg.append('g')
      .attr('transform', `translate(${canvasMargin.left},${canvasMargin.top})`)
      .attr('id','mainG');

    //This function uses the link between nodes, which won't exist in the actual tree. Needs to draw a line between two nodes instead.
    const elbow = (d: d3.HierarchyPointLink<Person>) => {
      return `M${d.source.y},${d.source.x}
              H${d.target.y}
              V${d.target.x}
              H${d.target.y}`
    }

    // eventually will need to load in the json
    
    const nodes = d3.hierarchy<Person>(jsonData, (d) => d.parents)
  
    // maps hierarchy to tree layout
    const treeNodes = tree(nodes);
  
    // adds links between nodes
    const link = mainG.selectAll('.link')
      .data(treeNodes.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', elbow)
      .attr("stroke", "black") //These last two lines are super important!! Doesn't work without it.
      .attr("fill", "none");
  
    // in the real tree, name the nodes by id number so they are easy to go retreive later
    const node = mainG.selectAll('.node')
      .data(treeNodes.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr( 'transform', d => `translate(${d.y},${d.x})`)
  
      // build the card
    // make these dynamic: 
    //should just be able to change these two:
      let cardWidth: number = 300;
      let cardHeight: number = 100;

    // and all of these should scale correctly
      let margin: number = 10;
      let YName: number = 60;
      let XName: number = 120;
      let YDate: number = 80;
      let XDate: number = 120;
      
      let circleRad: number = (cardHeight / 2) - 10;

      node.append("rect")
      .attr("x", margin)
      .attr("y", margin)
      .attr("width", cardWidth)
      .attr("height", cardHeight)
      .attr("rx", 20)
      .attr("ry", 20)
      .style("fill", "white")
      .style("stroke", "#d4158a")
      .style("stroke-width", 4);

      //add the circle
      let centerOffset: number = 50
      node.append("circle")
      .attr("cx", margin + centerOffset)
      .attr("cy", margin + centerOffset)
      .attr("r", circleRad)
      .style("fill", "none")
      .style("stroke", "#d4158a")
      .style("stroke-width", 4);
    
    // Define a circular clipPath container
    node.append("defs")
      .append("clipPath")
      .attr("id", "cropCircle") // Set an ID for reference
      .append("circle")
      .attr("cx", margin + centerOffset)
      .attr("cy", margin + centerOffset)
      .attr("r", circleRad - 1); // Circle with radius 98 so you can see the pink line

    // Append an image inside the circle using clip-path
    node.append("image")
      .attr("xlink:href", "./src/assets/DuckDucken.jpg") // Replace with your image path
      //might want to fix this later so that the image is more centered
      .attr("x", margin) // Adjust x to position the image within the circle
      .attr("y", margin) // Adjust y to position the image within the circle
      .attr("width", cardHeight) // Adjust width of the image
      .attr("height", cardHeight) // Adjust height of the image
      .attr("clip-path", "url(#cropCircle)"); // Apply the circle clip-path

    node.append("text")
    .attr("x", XName)          // Set the x position of the text
    .attr("y", YName)           // Set the y position of the text
    .attr("font-family", "sans-serif")  // Set font family
    .attr("font-size", "24px")          // Set font size
    .attr("font-weight", "bold")   
    .attr("fill", "#d4158a")              // Set text color
    .text("Duck Ducken"); // not sure how this looks exactly coming from FamilySearch yet... do I need to concat first + last names?
  
    node.append("text")
      .attr("x", XDate)          // Set the x position of the text
      .attr("y", YDate)           // Set the y position of the text
      .attr("font-family", "sans-serif")  // Set font family
      .attr("font-size", "15px")          // Set font size
      .attr("fill", "#d4158a")              // Set text color
      .text("1842 - 1927"); // Definitely will need to concat for this later
    }
    
    return (
      <div>
        <div>Tree with cards!</div>
        <h1>Duck Ducken: Where did I come from?</h1>
        <div id="ctree-container"></div>
      </div>
    );
  };
  
  export default OldDataNewTree;