import drawMainCard from '../Components/DrawCard';

import CardComp from '../Components/CardComp';
// Living vs. unknown
const DynamicCard = () => {

    const div = document.createElement("div");
    div.id = "card-test-container"
    return (
      <div className='w-full h-[75vh]'>
        <div>If you can read this, you can read!</div>
        <div id = "card-test-container" className="absolute left-0 w-full h-full border-4 border-sky-300"></div>
        <CardComp width={200} pid="password123" gender = "F" firstName="Duck" lastName="Ducken" birthYear="1885" deathYear="1927" xcoord={0} ycoord={300} drawCard={drawMainCard}/>
      </div>
    );
  };
  
  export default DynamicCard;