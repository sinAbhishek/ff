import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./card.css";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Card = ({ chardetails }) => {
  const [flipped, setflipped] = useState(false);
  const [random, setrandom] = useState(1);
  const [home, sethome] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    console.log(chardetails);
    setrandom(Math.floor(Math.random() * 2 + 1));
  }, []);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(chardetails.homeworld);
      console.log(res.data);
      sethome(res.data);
    };
    chardetails && call();
  }, [chardetails]);
  const flip = () => {
    setflipped(!flipped);
  };
  return (
    <div className="container rounded-lg">
      <div
        onClick={handleOpen}
        className="card rounded-lg hover:cursor-pointer "
      >
        <div className="front rounded-lg">
          <div className=" w-full h-1/2">
            <img
              className="imstyle w-full h-full bg-contain "
              src={`./${chardetails.name}-${random}.jpeg`}
              alt=""
            />
          </div>
          <h1 className=" text-white font-bold my-4 mx-2 text-lg">
            {chardetails.name}
          </h1>
        </div>
        <div className="back rounded-lg ">
          <h1 className=" text-white font-semibold p-4 mt-8 text-xl ">
            Skin color :{" "}
            <span className=" italic">{chardetails.skin_color}</span>
          </h1>
          <h1 className=" text-white font-semibold p-4 text-xl">
            Hair color :{" "}
            <span className=" italic">{chardetails.hair_color}</span>
          </h1>
          <h1 className=" text-white font-semibold p-4 text-xl">
            Eye color : <span className=" italic">{chardetails.eye_color}</span>
          </h1>
          <h1 className=" text-white font-semibold p-4 text-xl">
            Gender : <span className=" italic">{chardetails.gender}</span>
          </h1>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" relative flex flex-col justify-between h-full">
            <h1 className=" text-4xl font-bold text-slate-100 ml-2">
              {chardetails.name}
            </h1>
            <div className=" p-4 flex">
              <img
                className=" modimg"
                src={`./${chardetails.name}-${random}.jpeg`}
                alt=""
              />
              <div className=" ml-4">
                <h1 className=" text-white">
                  Height -{" "}
                  <span className=" font-bold ">{chardetails.height}</span>
                </h1>
                <h1 className=" text-white">
                  Mass - <span className=" font-bold ">{chardetails.mass}</span>
                </h1>
                <h1 className=" text-white">
                  DateAdded -{" "}
                  <span className=" font-bold ">
                    {chardetails.created.slice(0, 10)}
                  </span>
                </h1>
                <h1 className=" text-white">
                  Number of films -{" "}
                  <span className=" font-bold ">
                    {chardetails.films.length}
                  </span>
                </h1>
                <h1 className=" text-white">
                  Birth Year -{" "}
                  <span className=" font-bold ">{chardetails.birth_year}</span>
                </h1>
              </div>
            </div>
            {home && (
              <div className="  w-full bg-slate-300">
                <div className=" ml-4">
                  <h1 className="  font-bold text-2xl text-gray-900 underline ">
                    Homeworld
                  </h1>
                  <h1 className=" text-black font-semibold">
                    Name - <span className=" font-bold">{home.name}</span>
                  </h1>
                  <h1 className=" text-black font-semibold">
                    Terrain - <span className=" font-bold">{home.terrain}</span>
                  </h1>
                  <h1 className=" text-black font-semibold">
                    Climate - <span className=" font-bold">{home.climate}</span>
                  </h1>
                  <h1 className=" text-black font-semibold">
                    Residents -{" "}
                    <span className=" font-bold">{home.residents.length}</span>
                  </h1>
                  <h1 className=" text-black font-semibold">
                    Orbital period -{" "}
                    <span className=" font-bold">{home.orbital_period}</span>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
