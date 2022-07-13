import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import "./index.css";

const socket = new WebSocket("ws://localhost:8080");

const Player2 = () => {
  const { id } = useParams();
  const [playerName, setPlayerName] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showPlayerCanStartText, setShowPlayerCanStartText] = useState(false);

  const navigate = useNavigate();

  const saveName = () => {
    if (socket.OPEN === 1) {
      const message = {
        player: 2,
        playerName,
        gameId: id,
      };

      socket.send(JSON.stringify(message));
      setShowPlayerCanStartText(true);
    }
  };

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);

    if (message.message === "REDIRECT") {
      navigate(`/game/${id}`, {
        state: {
          player: 2,
          playerName,
          gameId: id,
        },
      });
    }
  };

  const render = () => {
    if (isPageLoading) {
      return "...";
    } else {
      return (
        <div>
          <p className="text-2xl mb-2">Enter your name</p>
          <div className="flex gap-4 items-center">
            <Input value={playerName} setValue={setPlayerName} />
            <PrimaryButton
              onClick={saveName}
              isDisabled={!playerName.trim().length}
            >
              Save
            </PrimaryButton>
          </div>
          {showPlayerCanStartText && (
            <p className="waiting-text text-center text-3xl">
              Waiting for Player 1 to start the game
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-36">{render()}</div>
  );
};

export default Player2;
