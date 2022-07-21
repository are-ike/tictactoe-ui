import { useEffect } from "react";

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
//change on window resize
//put in middle of box; get height
//get height of grid
const Line = ({ indexes }) => {
    const getTransformOrigin = () => {
        
        if(indexes[0] === 0 && indexes[0] === 1 && indexes[0] === 2){
            return {}
        }
        if(indexes[0] === 0 && indexes[0] === 3 && indexes[0] === 6){
            return {
                transformOrigin: 'top left',

            }
        }
        if(indexes[0] === 0 && indexes[0] === 1 && indexes[0] === 2){
            return null
        }

    }

  useEffect(() => {
      let style = {position: 'absolute'}
    const boxes = indexes.map((idx) => document.querySelectorAll(".box")[idx]);
    const boxesDimensions = boxes.map(box => box.getBoundingClientRect())

    style.top = `${boxesDimensions[0].top}`
    style.left = `${boxesDimensions[0].left}`


  }, []);
  return <div></div>;
};

export default Line;
