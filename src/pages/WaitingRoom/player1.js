import { useEffect, useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import "./index.css";

const socket = new WebSocket("ws://localhost:8080");

const Player1 = () => {
  const [playerName, setPlayerName] = useState("");
  const [showPlayerWaitingText, setShowPlayerWaitingText] = useState(false);

  const [gameLink, setGameLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(gameLink);
    setShowPlayerWaitingText(true);
  };

  const generateLink = () => {
    setIsGeneratingLink(true);

    socket.onopen = (e) => {
      console.log("open");
      const message = {
        player: 1,
      };
      socket.send(JSON.stringify(message));
    };

    socket.onerror = () => {
      alert("err");
    };

    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);

      if (message.player === 1) {
        setGameLink(`${window.origin}/waiting-room/${message.message}`);
        setIsGeneratingLink(false);
      }
      if (message.player === "ALL" && message.message === "START") {
        setIsPlayer2Ready(true);
        setShowPlayerWaitingText(false);
      }
    };
  };

  const startGame = () => {
    const message = {
      player: 1,
      message: "REDIRECT PLAYER 2",
    };
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

      {isGeneratingLink && <div>...</div>}

      {showPlayerWaitingText && (
        <p className="waiting-text text-center text-3xl">
          Waiting for Player 2
        </p>
      )}

      {isPlayer2Ready && (
        <div className="flex justify-end">
          <PrimaryButton isLink link={"/game"}>
            Start game
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Player1;
