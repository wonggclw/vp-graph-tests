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
      return () =>{
        d3.select("svg").remove();
      };
    }, []);
    return (
        <p></p>
    );
  };
  
  export default CardComp;