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

    //this wraps the tree in a g element. 
    // Makes it easier to move to where you want to start and helps with dragging.
      const mainG = svg.append('g')
      .attr('transform', `translate(${canvasMargin.left},${canvasMargin.top})`)
      .attr('id','mainG');

      // //TODO: work on this. Still not dragging the tree element around correctly
      // const dragHandler = d3.drag<SVGGElement, unknown>()
      //   .on('start', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
      //     d3.select(event.subject as SVGGElement);
      //   })
      //   .on('drag', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
      //     const target = d3.select(event.subject as SVGGElement);
      //     const transform = target.attr('transform');
      //     const match = transform?.match(/translate\(([^,]+),([^,]+)\)/);
      //     if (match) {
      //       const [x, y] = match.slice(1).map(Number);
      //       target.attr('transform', `translate(${x + event.dx}, ${y + event.dy})`);
      //     }
      //   })
      //   .on('end', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
      //     //const target = 
      //     d3.select(event.subject as SVGGElement);
      //     //target.select('circle').attr('stroke', 'black');
      //   });
//THINGS I know work:
// The drag handler is attatched to the g element
// alert works

      const dragHandler = d3.drag<SVGGElement, unknown>()
        .on('start', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
          // Select the <g> element being dragged
          d3.select(event.subject as SVGGElement);
          //alert("dragged!");
        })
        .on('drag', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
          //const target = d3.select(event.subject as SVGGElement);
          const target = d3.select(event.sourceEvent.target);
          // Get the current transform attribute (if any)
          let transform = target.attr('transform') || 'translate(0,0)';
          
          // Extract the x and y translation from the transform string
          const match = transform.match(/translate\(([^,]+),([^,]+)\)/);
          let x = 0, y = 0;
          
          if (match) {
            x = parseFloat(match[1]);
            y = parseFloat(match[2]);
          }
          
          // Update the transform attribute with the new position
          target.attr('transform', `translate(${x + event.dx}, ${y + event.dy})`);
        })
        .on('end', (event: d3.D3DragEvent<SVGGElement, unknown, unknown>) => {
          // Final event after dragging ends (you can add custom behavior here)
          d3.select(event.subject as SVGGElement);
        });
    //can do this by const mainG or by id mainG
    dragHandler(d3.select('#mainG'));

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
        <div id="ctree-container"></div>
      </div>
    );
  };
  
  export default CTree;