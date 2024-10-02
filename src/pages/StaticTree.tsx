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
  }

  return(
    <div>
        <div>Static basic version of real tree</div>
       
        <div id="tree-container"></div>
    </div>
  ); 
};

export default StaticTree;

//The data is being transferred in correctly, code if you want to check:
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