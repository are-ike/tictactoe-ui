import { useEffect, useMemo, useState } from "react";
import "./index.css";

const boxSizes = {
  xs: 83,
  sm: 110,
  lg: 150,
};

const winNumbers = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
//right positioning
//width from dimensions
const lineClassnames = "origin-top-left bg-yellow absolute scale-sm-top";
//change on window resize

const getPositionClass = ({ top, left, right, dir }) => {
  //if line is vertical, dir is left because we need to place the line parallel to column line
  //if line is horizontal, dir is top because we need to place the line parallel to row line

  //remove height of line from middle point calculation
  const size = 110;
  const middlePoint = (size - 6) / 2;

  let topValue = top,
    rightValue = right,
    leftValue = left;

  if (dir === "top") {
    topValue = top + middlePoint;
  }
  if (dir === "left") {
    leftValue = left + middlePoint;
  }
  if (right) {
    return `top-[${topValue}px] right-[${rightValue}px]`;
  }
  return `top-[${topValue}px] left-[${leftValue}px]`;
};

const Line = ({ indexes }) => {
  const [dimensions, setDimensions] = useState([]);

  const className = useMemo(() => {
    let className = "";
    if (dimensions.length) {
      if (
        (indexes[0] === 0 && indexes[1] === 1 && indexes[2] === 2) ||
        (indexes[0] === 3 && indexes[1] === 4 && indexes[2] === 5) ||
        (indexes[0] === 6 && indexes[1] === 7 && indexes[2] === 8)
      ) {
        className += getPositionClass({
          dir: "top",
          top: dimensions[0].top,
          left: dimensions[0].left,
        });
      }
      if (
        (indexes[0] === 0 && indexes[1] === 3 && indexes[2] === 6) ||
        (indexes[0] === 1 && indexes[1] === 4 && indexes[2] === 7) ||
        (indexes[0] === 2 && indexes[1] === 5 && indexes[2] === 8)
      ) {
        className += `rotate-90 ${getPositionClass({
          dir: "left",
          left: dimensions[0].left,
          top: dimensions[0].top,
        })}`;
      }
      if (indexes[0] === 0 && indexes[1] === 4 && indexes[2] === 8) {
        className += `rotate-45 ${getPositionClass({
          dir: "diagonal",
          top: dimensions[0].top,
          left: dimensions[0].left,
        })}`;
      }
      if (indexes[0] === 2 && indexes[1] === 4 && indexes[2] === 6) {
        className += `rotate-[135deg] ${getPositionClass({
          dir: "diagonal",
          top: dimensions[0].top,
          right: dimensions[0].right,
        })}`;
      }
    }

    return className;
  }, [dimensions]);

  useEffect(() => {
    const boxes = indexes.map((idx) => document.querySelectorAll(".box")[idx]);
    const boxesDimensions = boxes.map((box) => box.getBoundingClientRect());
    console.log(boxesDimensions);
    setDimensions(boxesDimensions);
  }, []);
  return <div className={lineClassnames + " " + className}></div>;
};

export default Line;
