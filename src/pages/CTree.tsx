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


    //This function uses the link between nodes, which won't exist in the actual tree. Needs to draw a line between two nodes instead.
    const elbow = (d: d3.HierarchyPointLink<Person>) => {
      return `M${d.source.y},${d.source.x}
              H${d.target.y}
              V${d.target.x}
              H${d.target.y}`
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
      .attr("stroke", "black") //These last two lines are super important!! Doesn't work without it.
      .attr("fill", "none");
  
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
    
    return (
      <div>
        <div>Tree with cards!</div>
        <h1>Duck Ducken: Where did I come from?</h1>
        <div id = "ctree-container"></div>
      </div>
    );
  };
  
  export default CTree;