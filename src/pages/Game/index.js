import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import messages, {
  createMessage,
  createPlayMessage,
} from "../../utils/messages";
import classnames from "../../utils/classnames";
import "./index.css";

const socket = new WebSocket("ws://localhost:8080");
const { PLAYED, GAME } = messages;
const letters = {
  1: "X",
  2: "O",
};

const gridClassnames =
  "font-fredoka text-7xl font-bold flex items-center justify-center w-[150px] h-[150px] border ";

const Game = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gridValues, setGridValues] = useState(Array.from({ length: 9 }));

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPlayer) {
      setIsCurrentPlayer(
        currentPlayer.playerNo === state.playerNo ? true : false
      );
      setIsLoading(false);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (
      socket.OPEN === 1 &&
      parseInt(localStorage.getItem("gameMessageSent") !== state.playerNo)
    ) {
      const message = createMessage({
        playerNo: state.playerNo,
        playerName: state.playerName,
        gameId: id,
        message: GAME,
      });

      socket.send(JSON.stringify(message));
      localStorage.setItem("gameMessageSent", state.playerNo);
    }
  }, [socket.OPEN, state.playerNo]);

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    console.log(data);

    if (message.message === PLAYED) {
      if (message.gameOver) {
        alert("over");
      }

      if (message.hasWinner) {
        alert(message.winner);
      }

      if (message.playerNo === 1) {
        setCurrentPlayer(players[1]);
      }

      if (message.playerNo === 2) {
        setCurrentPlayer(players[0]);
      }

      if (message.gridIdx >= 0) {
        console.log("ok");
        const newGridValues = [...gridValues];
        newGridValues[message.gridIdx] = letters[message.playerNo];
        console.log(newGridValues);
        setGridValues(newGridValues);
      }
    }

    if (message.message === GAME) {
      setPlayers(message.players);
      setCurrentPlayer(message.players[0]);
    }
  };

  const onGridBoxClick = (gridIdx) => {
    if (gridValues[gridIdx]) {
      return alert("taken");
    }
    console.log("yo");
    const message = createPlayMessage({
      gridIdx,
      playerNo: state.playerNo,
      gameId: id,
    });

    socket.send(JSON.stringify(message));
  };

  const render = () => {
    if (isLoading) {
      return "...";
    } else {
      return (
        <div className="flex flex-col items-center gap-y-6 p-6 justify-center">
          <p className="text-2xl">
            {currentPlayer.playerName} ( {letters[currentPlayer.playerNo]} ) is
            playing
          </p>
          <div className="grid grid-cols-3 grid-rows-3 max-w-[450px]">
            {gridValues.map((letter, i) => (
              <div
                className={classnames(
                  gridClassnames,
                  isCurrentPlayer || letter
                    ? "cursor-pointer hover:bg-white hover:bg-opacity-20"
                    : "pointer-events-none cursor-default"
                )}
                onClick={() => onGridBoxClick(i)}
                key={i}
              >
                {letter ? letter : ""}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return render();
};

export default Game;
