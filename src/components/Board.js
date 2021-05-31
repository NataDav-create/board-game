import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = ({ square, setSquare, rowLength, colLength, inlineStyle }) => {
  let row = [];
  let col = [];

  console.log(square);

  let [isText, setIsText] = useState(false);
  let [textSquare, setTextSquare] = useState("row: 0, col: 0");

  row.length = rowLength;
  col.length = colLength;

  const hoverHandler = (e) => {
    let target = e.target;

    target.style.backgroundColor =
      target.style.backgroundColor === "deepskyblue" ? "white" : "deepskyblue";
  };

  let board = [];
  for (let i = 1; i < row.length + 1; i++) {
    for (let j = 1; j < col.length + 1; j++) {
      board.push(
        <div
          key={`${j},${i}`}
          className="cell"
          style={{ inlineStyle }}
          onMouseEnter={(e) => {
            setTextSquare(`row: ${i}, col: ${j}`);
            hoverHandler(e);
            if (e.target.style.backgroundColor === "deepskyblue") {
              setSquare((prev) => {
                if (textSquare !== "") {
                  setIsText(true);
                  return [...prev, textSquare];
                } else if (textSquare === "") {
                  setIsText(false);
                  setTextSquare(`row: ${i}, col: ${j}`);
                  return [textSquare];
                }
              });
            } else if (e.target.style.backgroundColor === "white") {
              let newItem = `row: ${i}, col: ${j}`;
              let items = square.filter((textSquare) => textSquare !== newItem);
              setSquare(items);
            }
          }}
        >
          {row[i]} {col[j]}
        </div>
      );
    }
  }

  return (
    <div className="content">
      <div
        style={{
          width: `${50 * row.length + row.length * 2}px`,
        }}
        className="board"
      >
        {board}{" "}
      </div>{" "}
      <div className="squaresWrapper">
        <h2
          style={{
            fontFamily: "sans-serif",
          }}
        >
          {" "}
          Hover squares{" "}
        </h2>{" "}
        {isText && (
          <div>
            {square.map((item, index) => {
              return <Square key={index} text={item} />;
            })}
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default Board;
