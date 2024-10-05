import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import fakeData from '../assets/fakeTree.json';

const StaticTree = () => {
  //set up data arrays
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const[peopleById, setPeopleById] = useState<Map<Number, Person>>(new Map());
  const[links, setLinks] = useState<Link[]>([]);
  const[root, setRoot] = useState<Person>();

  useEffect(() => {

    loadData();
    formatData();
    drawChart();

    return () => {
        //this does cleanup so that svg is only on the page when you are on the right page
        d3.select("svg").remove();
      };
  }, []); // Empty dependency array so this only runs once

  interface Person {
    id: number;
    firstName: string;
    lastName: string;
    born: number;
    died: number;
    img: string;
    gender: 'M' | 'F';
    parents?:Person[]
  }
  
  interface Link {
    id: number;
    type: 'Couple' | 'ParentChild';
    person1: number;
    person2: number;
  }
  
  interface TreeData {
    people: Person[];
    links: Link[];
  }

  const drawChart = () => {

    // all the vars that control canvas stuff
    let canvasWidth: number = 500;
    let canvasHeight: number = 500;
    const canvasMargin = {top: 0, right: 0, bottom: 0, left: 0};
    let treeWidth: number = canvasWidth - canvasMargin.left - canvasMargin.right;
    let treeHeight: number = canvasHeight - canvasMargin.top - canvasMargin.bottom;

    // creates the container for the tree
    const svg = d3
      .select('#tree-container')
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight);

    //this wraps the tree in a g element. 
    // Makes it easier to move to where you want to start and helps with dragging.
    const mainG = svg.append('g')
    .attr('transform', `translate(${canvasMargin.left},${canvasMargin.top})`)
    .attr('id','mainG');

    const treemap = d3.tree<Person>().size([treeHeight, treeWidth]);
    const treeStartNode = d3.hierarchy(root, d => d?.parents);
    
    // tofix: this works but isn't very pretty. Get rid of the undefined later?
    const nodes = treemap(treeStartNode as d3.HierarchyNode<Person>);

    // add the links
    const elbow = (d: d3.HierarchyPointLink<Person>) => {
      return `M${d.source.y},${d.source.x}
              H${d.target.y}
              V${d.target.x}
              H${d.target.y}`
    }

    const link = mainG.selectAll('.link')
      .data(nodes.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', elbow)
      .attr("stroke", "black") //These last two lines are super important!! Doesn't work without it.
      .attr("fill", "none");
    
    // add the nodes
    const node = mainG.selectAll('.node')
      .data(nodes.descendants())
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

    // style the nodes


  };

  const loadData = () => {
    const treeData: TreeData = fakeData as TreeData;

    setLinks(treeData.links);
    setPeopleList(treeData.people);

    const rootId: number = 1;
    peopleList.forEach((person, index) => {
        peopleById.set(person.id, person);
        if(person.id == rootId){
            setRoot(person);
        }
    })
  }

  const formatData = () => {
    // Add parents to each node in the map
    links.forEach((link, index) => {
        var childId: number = link.person1;
        var parentId: number = link.person2;

        // add the parent to the parent array of the child
        var child: Person | undefined = peopleById.get(childId);
        var parent: Person | undefined = peopleById.get(parentId);

        if((child != undefined) && (parent != undefined)){
            if(child.parents == undefined){
                child.parents = [];
            }
            child.parents.push(parent);
        }
    })

    console.log(peopleById);
  }

  return(
    <div>
        <div>Static basic version of real tree</div>
       
        <div id="tree-container"></div>
    </div>
  ); 
};

export default StaticTree;

//Code if you want to check data transfer, just lists the data out:
{/* <h1>People List</h1>
        <ul>
            {people.map((person) => (
            <li key={person.id}>
                <img src={person.img} alt={`${person.firstName} ${person.lastName}`} />
                <p>{person.firstName} {person.lastName} ({person.born} - {person.died})</p>
            </li>
            ))}
        </ul>

        <h1>Links</h1>
        <ul>
            {links.map((link) => (
            <li key={link.id}>
                {link.type} between Person {link.person1} and Person {link.person2}
            </li>
            ))}
        </ul> */}