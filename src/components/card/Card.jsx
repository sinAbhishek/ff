import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./card.css"
const Card = ({ chardetails }) => {
  const [flipped, setflipped] = useState(false);
  const [random,setrandom]=useState(1)
  useEffect(() => {
    console.log(chardetails);
    setrandom(Math.floor(Math.random()*2+1))
  });
  const flip = () => {
    setflipped(!flipped);
  };
  return (
    <div className="container rounded-lg">
<div className="card rounded-lg ">
  <div className="front rounded-lg">
    <div className=" w-full h-1/2">
    <img className="imstyle w-full h-full bg-contain " src={`./${chardetails.name}-${random}.jpeg`} alt="" />
    </div>
    <h1 className=" text-white font-bold my-4 mx-2 text-lg">{chardetails.name}</h1>
    
  </div>
  <div className="back rounded-lg ">
    <h1 className=" text-white font-semibold p-4 mt-8 text-xl ">Skin color : <span className=" italic">{chardetails.skin_color}</span></h1>
    <h1 className=" text-white font-semibold p-4 text-xl">Hair color : <span className=" italic">{chardetails.hair_color}</span></h1>
    <h1 className=" text-white font-semibold p-4 text-xl">Eye color : <span className=" italic">{chardetails.eye_color}</span></h1>
    <h1 className=" text-white font-semibold p-4 text-xl">Gender : <span className=" italic">{chardetails.gender}</span></h1>
  </div>
</div>
    </div>

  );
};

export default Card;
