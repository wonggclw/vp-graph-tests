import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';

import CardComp from '../Components/CardComp';
// Living vs. unknown
const DynamicCard: React.FC<CardProps> = () => {

    return (
      <div className='w-full h-[75vh]'>
        <div>If you can read this, you can read!</div>
        <CardComp width={300} pid="password123" gender = "F" firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927" xcoord={100} ycoord={200}/>
        {/* <CardComp width={300} pid="password678" gender = "M" firstName="Dino" lastName="Saurus" birthYear="3000" deathYear="30098" xcoord={300} ycoord={200}/> */}
        {/* <CardComp width={300} pid="password91011" gender = "G" firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927" imgSrc = "src/assets/otherDucken.jpg" xcoord={500} ycoord={200}/> */}
      </div>
    );
  };
  
  export default DynamicCard;