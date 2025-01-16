import React, {useEffect} from 'react';
import * as d3 from 'd3';
import drawMainCard from './DrawCard';
interface CardProps{
    width: number;
    pid: string;
    gender: string;
    firstName: string;
    lastName: string;
    birthYear: string;
    deathYear?: string;
    imgSrc?: string;
    xcoord?: number;
    ycoord?: number;
    drawCard: Function;
}

const CardComp: React.FC<CardProps> = ({width, pid, gender, firstName, lastName, birthYear, deathYear = "Living", imgSrc="none", xcoord=0, ycoord=0, drawCard}) => {
    useEffect(() => {
          drawCard(width, pid, gender, firstName, lastName, birthYear, xcoord, ycoord, deathYear, imgSrc)
          drawCard(200, "one", "M", "1", "1", "1", 200, 250)
          drawCard(200, "two", "F", "2", "2", "2", 200, 350)
          drawCard(1000, "oneone", "M", "1", "1", "1", 400, 225)
          drawCard(100, "onetwo", "F", "2", "2", "2", 400, 275)
      return () =>{
        d3.select("svg").remove();
      };
    }, []);
    return (
        <p></p>
    );
  };
  
  export default CardComp;