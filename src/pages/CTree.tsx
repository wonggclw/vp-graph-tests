import React, {useEffect} from 'react';
import * as d3 from 'd3';

const CTree = () => {
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

    const g = svg.append('g')
      .attr('transform', `translate(${canvasMargin.left},${canvasMargin.top})`)

    // this creates the elbow shaped connectors to connect the node to the tree
    const elbow = (d: d3.HierarchyPointLink<Person>) => {
      return `M${d.source.y},${d.source.x}H${d.target.y},V${d.target.x}${d.target.children ? '' : 'h' + canvasMargin.right}`
    }
    
    // eventually will need to load in the json using a promised based system
    
    const nodes = d3.hierarchy<Person>(jsonData, (d) => d.parents)
  
    // maps hierarchy to tree layout
    const treeNodes = tree(nodes);
  
    // adds links between nodes
    const link = g.selectAll('.link')
      .data(treeNodes.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', elbow)
  
    const node = g.selectAll('.node')
      .data(treeNodes.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr( 'transform', d => `translate(${d.y},${d.x})`)
  
      // build the card
      node.append('text')
        .attr('class', 'name')
        .attr('x', 8)
        .attr('y', -6)
        .text(d => `${d.data.firstName} ${d.data.lastName}`)
    
      node.append('text')
        .attr('x', 8)
        .attr('y', 8)
        .attr('dy', '.71em')
        .attr('class', 'about lifespan')
        .text(d => `${d.data.born} - ${d.data.died}`)
    }
    

    // //attr always comes before style - good practice
    // // draw the blank card
    // let margin: number = 10;
    // let YName: number = 60;
    // let XName: number = 120;
    // let YDate: number = 80;
    // let XDate: number = 120;
    // svg
    // .append("rect")
    // .attr("x", margin)
    // .attr("y", margin)
    // .attr("width", 300)
    // .attr("height", 100)
    // .attr("rx", 20)
    // .attr("ry", 20)
    // .style("fill", "white")
    // .style("stroke", "#d4158a")
    // .style("stroke-width", 4);

    // //add the circle
    // let centerOffset: number = 50
    // svg
    // .append("circle")
    // .attr("cx", margin + centerOffset)
    // .attr("cy", margin + centerOffset)
    // .attr("r", 40)
    // .style("fill", "none")
    // .style("stroke", "#d4158a")
    // .style("stroke-width", 4);

    // // //add the image inside the circle, accounting for stroke size
    // // svg
    // //   .append("image")
    // //   //.attr("xlink:href", "src\assets\DuckDucken.jpg")
    // //   .attr("xlink:href", "./src/assets/DuckDucken.jpg")
    // //   .attr("x", margin + centerOffset)
    // //   .attr("y", margin + centerOffset)
    // //   .attr("width", 100)
    // //   .attr("height", 100)
    // //   .attr("clip-path", "circle(100px)");

    // // Define a circular clipPath container
    // svg.append("defs")
    //   .append("clipPath")
    //   .attr("id", "cropCircle") // Set an ID for reference
    //   .append("circle")
    //   .attr("cx", margin + centerOffset)
    //   .attr("cy", margin + centerOffset)
    //   .attr("r", 39); // Circle with radius 98 so you can see the pink line

    // // Append an image inside the circle using clip-path
    // svg.append("image")
    //   .attr("xlink:href", "./src/assets/DuckDucken.jpg") // Replace with your image path
    //   //might want to fix this later so that the image is more centered
    //   .attr("x", 10) // Adjust x to position the image within the circle
    //   .attr("y", 10) // Adjust y to position the image within the circle
    //   .attr("width", 100) // Adjust width of the image
    //   .attr("height", 100) // Adjust height of the image
    //   .attr("clip-path", "url(#cropCircle)"); // Apply the circle clip-path

    // svg.append("text")
    //   .attr("x", XName)          // Set the x position of the text
    //   .attr("y", YName)           // Set the y position of the text
    //   .attr("font-family", "sans-serif")  // Set font family
    //   .attr("font-size", "24px")          // Set font size
    //   .attr("font-weight", "bold")   
    //   .attr("fill", "#d4158a")              // Set text color
    //   .text("Duck Ducken"); // not sure how this looks exactly coming from FamilySearch yet... do I need to concat first + last names?
    
    // svg.append("text")
    //   .attr("x", XDate)          // Set the x position of the text
    //   .attr("y", YDate)           // Set the y position of the text
    //   .attr("font-family", "sans-serif")  // Set font family
    //   .attr("font-size", "15px")          // Set font size
    //   .attr("fill", "#d4158a")              // Set text color
    //   .text("1842 - 1927"); // Definitely will need to concat for this later

    return (
      <div>
        <div>Tree with cards!</div>
        <h1>Duck Ducken: Where did I come from?</h1>
        <div id = "ctree-container"></div>
      </div>
    );
  };
  
  export default CTree;