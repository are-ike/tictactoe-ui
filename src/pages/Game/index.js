import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import messages, {
  createMessage,
  createPlayMessage,
} from "../../utils/messages";
import classnames from "../../utils/classnames";
import "./index.css";

const { PLAYED, GAME } = messages;
const letters = {
  1: "X",
  2: "O",
};

const gridClassnames =
  "font-fredoka text-7xl font-bold flex items-center justify-center w-[150px] h-[150px] border ";

const Game = () => {
  const { state } = useLocation();
  const [socket, setSocket] = useState(null);
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [sentGameMessage, setSentGameMessage] = useState(false); //useful?

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gridValues, setGridValues] = useState(Array.from({ length: 9 }));
  const [winner, setWinner] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      if (!sentGameMessage) {
        const message = createMessage({
          playerNo: state.playerNo,
          playerName: state.playerName,
          gameId: id,
          message: GAME,
        });

        socket.send(JSON.stringify(message));
        setSentGameMessage(true);

        setSocket(socket);
      }
    };
  }, [state.playerNo]);

  socket?.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);

    if (message.message === PLAYED) {
      if (message.gridValues) {
        const newGridValues = [...message.gridValues];
        setGridValues(newGridValues);
      }

      if (message.hasWinner) {
        setWinner(message.winner);
      }

      if (message.gameOver) {
        setGameOver(message.gameOver);
      }

      if (message.playerNo === 1 && !message.hasWinner && !message.gameOver) {
        setCurrentPlayer(players[1]);
      }

      if (message.playerNo === 2 && !message.hasWinner && !message.gameOver) {
        setCurrentPlayer(players[0]);
      }
    }

    if (message.message === GAME) {
      setPlayers(message.players);
      setCurrentPlayer(message.players[0]);
    }
  });

  useEffect(() => {
    if (currentPlayer) {
      setIsCurrentPlayer(
        currentPlayer.playerNo === state.playerNo ? true : false
      );

      if (isLoading) setIsLoading(false);
    }
  }, [currentPlayer]);

  const showHasWinner = useMemo(() => {
    if (gridValues.every((box) => box) && winner) {
      return true;
    }
    return false;
  });

  const showGameOver = useMemo(() => {
    if (gridValues.every((box) => box) && gameOver) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    window.addEventListener("load", (e) => {});
    return () => {};
  }, []);

  const onGridBoxClick = (gridIdx) => {
    if (gridValues[gridIdx]) {
      return alert("taken");
    }

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
    }
    if (!isLoading) {
      return (
        <div className="flex flex-col items-center gap-y-6 p-6 justify-center">
          <p className="text-2xl">
            {currentPlayer?.playerName} ( {letters[currentPlayer?.playerNo]} )
            is playing
          </p>
          <div className="grid grid-cols-3 grid-rows-3 max-w-[450px]">
            {gridValues.map((letter, i) => (
              <div
                className={classnames(
                  gridClassnames,
                  isCurrentPlayer && !letter
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

    if (showHasWinner) {
      return alert("yay");
    }

    if (showGameOver) {
      return alert("over");
    }
  };

  return render();
};

export default Game;
