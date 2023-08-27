import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card/Card";
import { ClimbingBoxLoader } from "react-spinners/";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
function App() {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);
  const [page, setpage] = useState(JSON.parse(localStorage.getItem("page")));
  const [pageNo, setpageNo] = useState(1);
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
      const res = await axios.get(
        `https://swapi.dev/api/people/?page=${pageNo}`
      );
      console.log(res.data.results);
      setdata(res.data.results);
      setloader(false);
    };
    pageNo && call();
  }, [pageNo]);
  return (
    <>
      <div className="App flex flex-wrap justify-center relative">
        {data && data.map((c) => <Card chardetails={c} />)}
        {data[0] && (
          <div className="pageswitch absolute bottom-4 ">
            <ArrowCircleLeftIcon
              disabled={true}
              onClick={() => decrease()}
              className={page === 1 ? "left-btn disable" : "left-btn"}
            />
            <ArrowCircleRightIcon
              onClick={() => increase()}
              className="right-btn"
            />
          </div>
        )}
      </div>
      {loader && (
        <div className=" flex justify-center items-center w-full h-screen">
          <ClimbingBoxLoader color="#f72d77" />
        </div>
      )}
    </>
  );
}

export default App;
