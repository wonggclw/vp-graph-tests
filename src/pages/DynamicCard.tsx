import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import drawMainCard from '../Components/DrawCard';

import CardComp from '../Components/CardComp';
// Living vs. unknown
const DynamicCard: React.FC<CardProps> = () => {

    const div = document.createElement("div");
    div.id = "card-test-container"
    return (
      <div className='w-full h-[75vh]'>
        <div>If you can read this, you can read!</div>
        <div id = "card-test-container" className="w-full h-full border-4 border-sky-300"></div>
        <CardComp width={300} pid="password123" gender = "F" firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927" xcoord={30} ycoord={0} drawCard={drawMainCard} imgSrc="../DuckDucken.jpg"/>
        {<CardComp width={300} pid="password678" gender = "M" firstName="Dino" lastName="Saurus" birthYear="3000" deathYear="30098" imgSrc="../DuckDucken.jpg" xcoord={0} ycoord={100} drawCard={drawMainCard}/>}
        {/*<CardComp width={300} pid="password91011" gender = "G" firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927" imgSrc = "src/assets/otherDucken.jpg" xcoord={500} ycoord={200} drawCard={drawMainCard}/>*/}
      </div>
    );
  };
  
  export default DynamicCard;