import { useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import { v4 as uuid } from "uuid";
import messages, { createMessage } from "../../utils/messages";
import "./index.css";

const socket = new WebSocket("ws://localhost:8080");
const { REDIRECT, CREATE } = messages;
const playerNo = 1;

const Player1 = () => {
  const [playerName, setPlayerName] = useState("");
  const [showPlayerWaitingText, setShowPlayerWaitingText] = useState(false);

  const [gameId, setGameId] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(gameLink);
    setShowPlayerWaitingText(true);
  };

  const generateLink = () => {
    const gameId = uuid();
    setGameId(gameId);
    setGameLink(`${window.origin}/waiting-room/${gameId}`);

    if (socket.OPEN === 1) {
      const message = createMessage({
        playerName,
        playerNo,
        gameId,
        message: CREATE,
      });

      socket.send(JSON.stringify(message));
    }
  };

  socket.onerror = () => {
    alert("err");
  };

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);

    if (message.message === "START") {
      setIsPlayer2Ready(true);
      setShowPlayerWaitingText(false);
    }
  };

  const onStartGame = () => {
    const message = createMessage({
      playerName,
      playerNo,
      gameId,
      message: REDIRECT,
    });

    socket.send(JSON.stringify(message));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-36">
      <div>
        <p className="text-2xl mb-2">Enter your name</p>
        <div className="flex gap-4 items-center">
          <Input value={playerName} setValue={setPlayerName} />
          <PrimaryButton
            onClick={generateLink}
            isDisabled={!playerName.trim().length}
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
          <PrimaryButton
            isLink
            link={`/game/${gameId}`}
            hasState={true}
            state={{
              playerNo,
              playerName,
              gameId,
            }}
            onClick={onStartGame}
          >
            Start game
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Player1;
