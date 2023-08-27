import { useEffect, useState } from "react";
import axios from "axios";
import Error from "./components/Error";
import "./App.css";
import Card from "./components/card/Card";
import { ClimbingBoxLoader } from "react-spinners/";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
function App() {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [pageNo, setpageNo] = useState(1);
  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(1));
  }, []);
  const increase = () => {
    setloader(true);
    setdata([]);
    setpage(page + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
    setpageNo(JSON.parse(localStorage.getItem("page")));
  }, [page]);

  const decrease = () => {
    setloader(true);
    setdata([]);
    page != 1 && setpage(page - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get(
          `https://swapi.dev/api/people/?page=${pageNo}`
        );
        console.log(res.data.results);
        setdata(res.data.results);
        setloader(false);
      } catch (err) {
        seterror(true);
      }
    };
    pageNo && call();
  }, [pageNo]);
  return (
    <>
      {!error ? (
        <div className="">
          <div className=" w-full flex justify-center mt-4">
            <h1 className="titlest text-yellow-400 text-5xl">STAR WARS</h1>
          </div>
          <div className="App flex flex-wrap justify-center relative">
            {data && data.map((c, i) => <Card key={i} chardetails={c} />)}
          </div>
          {data[0] && (
            <div className="pageswitch w-full flex justify-center p-4 ">
              <ArrowCircleLeftIcon
                style={{ color: "white" }}
                fontSize="large"
                disabled={page === 1 ? true : false}
                onClick={() => decrease()}
                className=" hover:cursor-pointer"
              />
              <ArrowCircleRightIcon
                color="white"
                fontSize="large"
                style={{ color: "white" }}
                onClick={() => increase()}
                className=" hover:cursor-pointer"
              />
            </div>
          )}
          {loader && (
            <div className=" flex justify-center items-center w-full h-screen">
              <ClimbingBoxLoader color="#f72d77" />
            </div>
          )}
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}

export default App;
