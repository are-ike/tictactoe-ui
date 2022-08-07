import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import messages, { createMessage } from "../../utils/messages";
import useWebSocket from "../../hooks/useWebSocket";
import "./index.css";

const { REDIRECT, CREATE, JOIN } = messages;
const playerNo = 2;

const Player2 = () => {
  const { id } = useParams();
  const [playerName, setPlayerName] = useState("");
  const [disableName, setDisableName] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showPlayerCanStartText, setShowPlayerCanStartText] = useState(false);

  const { connect } = useWebSocket({
    onMessage: (data) => {
      if (data.message === REDIRECT) {
        navigate(`/game/${id}`, {
          state: {
            playerNo,
            playerName,
            gameId: id,
          },
        });
      }
    },
  });

  const navigate = useNavigate();

  const saveName = async () => {
    const socket = await connect();

    const message = createMessage({
      playerNo,
      playerName,
      gameId: id,
      message: JOIN,
    });

    socket.send(JSON.stringify(message));
    setShowPlayerCanStartText(true);
    setDisableName(true);
  };

  const render = () => {
    if (isPageLoading) {
      return "...";
    } else {
      return (
        <div>
          <p className="text-2xl mb-2">Enter your name</p>
          <div className="flex gap-4 items-center">
            <Input
              value={playerName}
              setValue={setPlayerName}
              onEnter={saveName}
              isDisabled={disableName}
            />
            <PrimaryButton
              onClick={saveName}
              isDisabled={!playerName.trim().length || disableName}
            >
              Save
            </PrimaryButton>
          </div>
          {showPlayerCanStartText && (
            <p className="waiting-text text-center text-3xl mt-36">
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
