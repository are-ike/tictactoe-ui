import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import messages, {
  createMessage,
  createPlayMessage,
} from "../../utils/messages";
import classnames from "../../utils/classnames";
import useWebSocket from "../../hooks/useWebSocket";
import "./index.css";
import Line from "../../components/line";
import PrimaryButton from "../../components/button/PrimaryButton";

const { PLAYED, GAME } = messages;
const letters = {
  1: "X",
  2: "O",
};

const gridClassnames =
  "box font-fredoka text-7xl font-bold flex items-center justify-center w-[83px] h-[83px] xs:w-[110px] xs:h-[110px] sm:w-[150px] sm:h-[150px] border ";

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
    winningIdxs: [],
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
  }, []);

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
      let winningIdxs = [...game.winningIdxs];

      const set = () => {
        setGame({
          gridValues,
          hasWinner,
          winner,
          isGameOver,
          winningIdxs,
        });
      };

      if (message.gridValues) {
        gridValues = [...message.gridValues];
      }

      if (message.hasWinner) {
        hasWinner = true;
        winner = message.winner;
        winningIdxs = message.winningIdxs;
        isGameOver = true;
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

  const onGridBoxClick = (gridIdx) => {
    const message = createPlayMessage({
      gridIdx,
      playerNo: state.playerNo,
      gameId: id,
    });

    socket.send(JSON.stringify(message));
  };

  const canPlay = (letter) => isCurrentPlayer && !letter && !game.isGameOver;

  const renderPlayingText = () => {
    if (game.isGameOver && !game.hasWinner) {
      return "👀 😬 Draw 😬 👀";
    }

    if (game.isGameOver && game.hasWinner) {
      return ` 🥳 🎉 ${players[game.winner - 1]?.playerName} has won 🥳 🎉`;
    }

    return `${currentPlayer?.playerName} ( ${letters[currentPlayer?.playerNo]} )
      is playing...`;
  };

  const updateScores = () => {
    const getScores = (playerNo, currentScore) =>
      playerNo === game.winner ? currentScore + 1 : currentScore;

    const scores = JSON.parse(localStorage.getItem(`scores-${id}`));

    let newScores;
    if (scores) {
      newScores = { ...scores };
      newScores[1].score = getScores(1, newScores[1].score);
      newScores[2].score = getScores(2, newScores[2].score);
    } else {
      newScores = {
        1: { name: players[0]?.playerName, score: getScores(1, 0) },
        2: { name: players[1]?.playerName, score: getScores(2, 0) },
      };
    }

    localStorage.setItem(`scores-${id}`, JSON.stringify(newScores));
  };

  const goToScoreboard = () => {
    updateScores();
    navigate(`/scoreboard/${id}`);
  };

  const render = () => {
    if (isLoading) {
      return "...";
    }
    if (!isLoading) {
      return (
        <div className="flex flex-col items-center gap-y-6 p-6 justify-center">
          {game.hasWinner && (
            <Line indexes={game.hasWinner && game.winningIdxs} />
          )}

          <p className="text-2xl">{renderPlayingText()}</p>
          <div className="grid grid-cols-3 grid-rows-3 w-[249px] xs:w-[330px] sm:w-[450px]">
            {game.gridValues.map((letter, i) => (
              <div
                className={classnames(
                  gridClassnames,
                  letter === letters[1] && 'text-teal',
                  canPlay(letter)
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
          {game.isGameOver && (
            <div className="mt-10">
              <PrimaryButton onClick={goToScoreboard}>
                go to scoreboard
              </PrimaryButton>
            </div>
          )}
        </div>
      );
    }
  };

  return render();
};

export default Game;
