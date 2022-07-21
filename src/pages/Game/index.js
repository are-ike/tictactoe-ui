import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import messages, {
  createMessage,
  createPlayMessage,
} from "../../utils/messages";
import classnames from "../../utils/classnames";
import useWebSocket from "../../hooks/useWebSocket";
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
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState({
    gridValues: Array.from({ length: 9 }),
    hasWinner: false,
    winner: null,
    isGameOver: false,
  });

  const { connect, socket } = useWebSocket({ onMessage: null });
  const navigate = useNavigate();

  useEffect(() => {
    const startGame = async () => {
      const socket = await connect();

      const message = createMessage({
        playerNo: state.playerNo,
        playerName: state.playerName,
        gameId: id,
        message: GAME,
      });

      socket.send(JSON.stringify(message));
    };
    startGame();
  }, [state.playerNo]);

  useEffect(() => {
    if (currentPlayer) {
      setIsCurrentPlayer(
        currentPlayer.playerNo === state.playerNo ? true : false
      );

      if (isLoading) setIsLoading(false);
    }
  }, [currentPlayer]);

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);

    if (message.message === PLAYED) {
      let gridValues = [...game.gridValues];
      let hasWinner = game.hasWinner;
      let winner = game.winner;
      let isGameOver = game.isGameOver;

      const set = () => {
        setGame({
          gridValues,
          hasWinner,
          winner,
          isGameOver,
        });
      };

      if (message.gridValues) {
        gridValues = [...message.gridValues];
      }

      if (message.hasWinner) {
        hasWinner = true;
        winner = message.winner;
        return set();
      }

      if (message.gameOver) {
        isGameOver = true;
        return set();
      }

      if (message.playerNo === 1 && !message.hasWinner && !message.gameOver) {
        setCurrentPlayer(players[1]);
      }

      if (message.playerNo === 2 && !message.hasWinner && !message.gameOver) {
        setCurrentPlayer(players[0]);
      }

      set();
    }

    if (message.message === GAME) {
      setPlayers([...message.players]);
      setCurrentPlayer(message.players[0]);
    }
  };

  useEffect(() => {
    window.addEventListener("load", (e) => {});
    return () => {};
  }, []);

  const onGridBoxClick = (gridIdx) => {
    if (game.gridValues[gridIdx]) {
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
            {game.gridValues.map((letter, i) => (
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
  };

  return render();
};

export default Game;
