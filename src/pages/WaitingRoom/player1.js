import { useEffect, useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import { v4 as uuid } from "uuid";
import messages, { createMessage } from "../../utils/messages";
import useWebSocket from "../../hooks/useWebSocket";
import "./index.css";
import { useNavigate } from "react-router-dom";

const { REDIRECT, CREATE, START } = messages;
const playerNo = 1;

const Player1 = () => {
  const [playerName, setPlayerName] = useState("");
  const [disableName, setDisableName] = useState(false);
  const [showPlayerWaitingText, setShowPlayerWaitingText] = useState(false);

  const [gameId, setGameId] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  const navigate = useNavigate();

  const { connect, socket } = useWebSocket({
    onMessage: (data) => {
      if (data.message === START) {
        setIsPlayer2Ready(true);
        setShowPlayerWaitingText(false);
      }
    },
  });

  const copyLink = () => {
    navigator.clipboard.writeText(gameLink);
    setShowPlayerWaitingText(true);
  };

  const generateLink = async () => {
    const gameId = uuid();
    setGameId(gameId);
    setGameLink(`${window.origin}/waiting-room/${gameId}`);
    setDisableName(true);

    const newSocket = await connect();

    const message = createMessage({
      playerName,
      playerNo,
      gameId,
      message: CREATE,
    });

    newSocket.send(JSON.stringify(message));
  };

  const onStartGame = () => {
    const message = createMessage({
      playerName,
      playerNo,
      gameId,
      message: REDIRECT,
    });

    socket.send(JSON.stringify(message));
    navigate(`/game/${gameId}`, {
      state: {
        playerNo,
        playerName,
        gameId,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-36">
      <div>
        <p className="text-2xl mb-2">Enter your name</p>
        <div className="flex gap-4 items-center">
          <Input
            value={playerName}
            setValue={setPlayerName}
            onEnter={generateLink}
            isDisabled={disableName}
          />
          <PrimaryButton
            onClick={generateLink}
            isDisabled={!playerName.trim().length || disableName}
          >
            Save
          </PrimaryButton>
        </div>
      </div>

      {gameLink && (
        <div className="flex gap-4 items-center">
          <Input isDisabled value={gameLink} />
          <SecondaryButton onClick={copyLink}>Copy</SecondaryButton>
        </div>
      )}

      {showPlayerWaitingText && (
        <p className="waiting-text text-center text-3xl">
          Waiting for Player 2
        </p>
      )}

      {isPlayer2Ready && (
        <div className="flex justify-end">
          <PrimaryButton onClick={onStartGame}>Start game</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Player1;
