import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card/Card";
function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get("https://swapi.dev/api/people/?page=3");
      console.log(res.data.results);
      setdata(res.data.results);
    };
    call();
  }, []);
  return (
    <div className="App">
      {data && data.map((c) => <Card chardetails={c} />)}
    </div>
  );
}

export default App;
