import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

const url = "http://demo1030918.mockable.io/";

function App() {
  const [modeState, setModeState] = useState("");
  const [dataMode, setDataMode] = useState([]);
  const [numberCells, setNumberCells] = useState([]);
  const [square, setSquare] = useState([]);
  const [rowLength, setRowLength] = useState(0);
  const [colLength, setColLength] = useState(0);
  let [style, setStyle] = useState({ backgroundColor: "white" });
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    let keys = Object.keys(data);
    let values = Object.values(data);
    setNumberCells(values);
    setDataMode(keys);
  };
  useEffect(() => {
    getData();
  }, []);

  const selectHandler = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode !== "Pick mode") setModeState(selectedMode);
  };

  const startGame = (el) => {
    setStyle = {
      backgroundColor: "white",
    };
    if (modeState === "easyMode") {
      el = numberCells[0];
    } else if (modeState === "normalMode") {
      el = numberCells[1];
    } else if (modeState === "hardMode") {
      el = numberCells[2];
    } else {
      el = "";
    }
    setRowLength(el.field);
    setColLength(el.field);
  };

  return (
    <div className="wrapper">
      <select className="selectMode" onChange={selectHandler}>
        <option> Pick mode </option>{" "}
        {dataMode.map((data, index) => {
          return (
            <option key={index} value={data}>
              {" "}
              {data}{" "}
            </option>
          );
        })}{" "}
      </select>{" "}
      <button className="btn" onClick={startGame}>
        Start{" "}
      </button>
      <div className="inner">
        {" "}
        <Board
          square={square}
          setSquare={setSquare}
          rowLength={rowLength}
          colLength={colLength}
          inlineStyle={style}
        />{" "}
      </div>
    </div>
  );
}

export default App;
