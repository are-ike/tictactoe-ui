import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const players = {
  ike: { name: "ike", letter: "X" }, //one
  ife: { name: "ife", letter: "O" },
};

const gridClassnames =
  "font-fredoka text-7xl font-bold flex items-center justify-center w-[150px] h-[150px] hover:bg-white hover:bg-opacity-20 border cursor-pointer";

const determineWinner = () => {};
const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState(players.ike);
  const [gridValues, setGridValues] = useState(Array.from({ length: 9 }));

  const navigate = useNavigate();

  const onGridBoxClick = (boxId) => {
    if (gridValues[boxId]) {
      alert("taken");
    } else {
      const newGridValues = [...gridValues];
      newGridValues[boxId] = currentPlayer.letter;
      setGridValues(newGridValues);
      setCurrentPlayer(
        currentPlayer === players.ike ? players.ife : players.ike
      );
    }
    setTimeout(() => {
      navigate("/scoreboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-y-6 p-6 justify-center">
      <p className="text-2xl">
        {currentPlayer.name} ({currentPlayer.letter}) is playing
      </p>
      <div className="grid grid-cols-3 grid-rows-3 max-w-[450px]">
        {gridValues.map((x, i) => (
          <div
            className={gridClassnames}
            onClick={() => onGridBoxClick(i)}
            key={i}
          >
            {x ? x : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
