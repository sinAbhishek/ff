import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
const Card = ({ chardetails }) => {
  const [flipped, setflipped] = useState(false);
  useEffect(() => {
    console.log(chardetails);
  });
  const flip = () => {
    setflipped(!flipped);
  };
  return (
    <div>
      <ReactCardFlip
        flipDirection="horizontal"
        isFlipped={flipped}
        flipSpeedFrontToBack={0.2}
      >
        <div
          onMouseEnter={flip}
          onMouseLeave={flip}
          onClick={flip}
          className=" w-16 h-36 bg-gray-600"
        >
          front
        </div>
        <div
          onClick={flip}
          onMouseEnter={flip}
          onMouseLeave={flip}
          className=" w-16 h-36 bg-red-600"
        >
          back
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
