import { useEffect, useMemo, useState } from "react";

const lineClassnames = "origin-top-left bg-yellow absolute h-[6px]";
//change on window resize

const getLineStyle = ({ top, left, dir, boxSize }) => {
  //if line is vertical, dir is left because we need to place the line parallel to column line
  //if line is horizontal, dir is top because we need to place the line parallel to row line

  const middlePoint = boxSize / 2; //remove height of line from middle point calculation
  const size = boxSize * 3;
  const style = {
    top: null,
    left: null,
    transform: null,
    width: `${size}px`,
  };

  if (dir === "top") {
    style.top = top + middlePoint - 3; //remove half of line height
    style.left = left;
  }

  if (dir === "left") {
    style.left = left + middlePoint + 3; //add half of line height
    style.top = top;
    style.transform = "rotate(90deg)";
  }

  if (dir === "diagonal right") {
    style.top = top - 3; //remove half of line height
    style.left = left;
    style.transform = "rotate(45deg)";
    style.width = `${Math.sqrt(Math.pow(size, 2) * 2)}px`;
  }

  if (dir === "diagonal left") {
    style.top = top + 3; //add half of line height
    style.left = left;
    style.transform = "rotate(135deg)";
    style.width = `${Math.sqrt(Math.pow(size, 2) * 2)}px`;
  }

  return style;
};

const Line = ({ indexes }) => {
  const [dimensions, setDimensions] = useState([]);
  const [isDrawn, setIsDrawn] = useState(false);

  const styles = useMemo(() => {
    let direction;

    if (dimensions.length) {
      if (
        (indexes[0] === 0 && indexes[1] === 1 && indexes[2] === 2) ||
        (indexes[0] === 3 && indexes[1] === 4 && indexes[2] === 5) ||
        (indexes[0] === 6 && indexes[1] === 7 && indexes[2] === 8)
      ) {
        direction = "top";
      }
      if (
        (indexes[0] === 0 && indexes[1] === 3 && indexes[2] === 6) ||
        (indexes[0] === 1 && indexes[1] === 4 && indexes[2] === 7) ||
        (indexes[0] === 2 && indexes[1] === 5 && indexes[2] === 8)
      ) {
        direction = "left";
      }
      if (indexes[0] === 0 && indexes[1] === 4 && indexes[2] === 8) {
        direction = "diagonal right";
      }
      if (indexes[0] === 2 && indexes[1] === 4 && indexes[2] === 6) {
        direction = "diagonal left";
      }

      if (direction === "diagonal left") {
        return getLineStyle({
          dir: direction,
          top: dimensions[0].top,
          left: dimensions[0].right,
          boxSize: dimensions[0].width,
        });
      } else {
        return getLineStyle({
          dir: direction,
          top: dimensions[0].top,
          left: dimensions[0].left,
          boxSize: dimensions[0].width,
        });
      }
    }

    return {};
  }, [dimensions]);

  useEffect(() => {
    if (indexes && !isDrawn) {
      const boxes = indexes.map(
        (idx) => document.querySelectorAll(".box")[idx]
      );
      const boxesDimensions = boxes.map((box) => box.getBoundingClientRect());
      setDimensions(boxesDimensions);

      setIsDrawn(true);
    }
  }, [indexes]);

  return <div className={lineClassnames} style={styles}></div>;
};

export default Line;
