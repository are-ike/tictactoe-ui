import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.css";

const socket = new WebSocket("ws://localhost:8080");

const gridClassnames =
  "font-fredoka text-7xl font-bold flex items-center justify-center w-[150px] h-[150px] hover:bg-white hover:bg-opacity-20 border cursor-pointer";

const Game = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [players, setPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const isCurrentPlayer = state.player === 1 ? true : false;
  const [gridValues, setGridValues] = useState(Array.from({ length: 9 }));

  const navigate = useNavigate();

  useEffect(() => {
    socket.send(
      JSON.stringify({
        message: "GAME",
        gameId: id,
      })
    );
  }, []);

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    console.log(data);
    if (message.message === "PLAYED") {
    }

    if (message.message === "GAME") {
      setPlayers(message.players);
    }
  };

  const onGridBoxClick = (gridIdx) => {
    if (gridValues[gridIdx]) {
      alert("taken");
    } else {
      socket.send(
        JSON.stringify({
          gridIdx,
          player: state.player,
          gameId: id,
          message: "PLAY",
        })
      );
    }
    //   const newGridValues = [...gridValues];
    //   newGridValues[boxId] = currentPlayer.letter;
    //   setGridValues(newGridValues);
    //   setCurrentPlayer(
    //     currentPlayer === players.ike ? players.ife : players.ike
    //   );
    // }
    // setTimeout(() => {
    //   navigate("/scoreboard");
    // }, 2000);
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
