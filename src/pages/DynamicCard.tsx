import React, {useEffect} from 'react';
import * as d3 from 'd3';
import CardComp from '../Components/CardComp';

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

const DynamicCard: React.FC<CardProps> = () => {
    return (
      <div>
        <div>If you can read this, you can read!</div>
        <CardComp width={300} firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927"/>
      </div>
    );
  };
  
  export default DynamicCard;