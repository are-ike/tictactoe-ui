import { useEffect, useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import Input from "../../components/input";
import "./index.css";

const WaitingRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [showPlayerWaitingText, setShowPlayerWaitingText] = useState(false);
  const [link, setLink] = useState("");
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(playerName);
    setShowPlayerWaitingText(true);
    setTimeout(() => {
      setIsPlayer2Ready(true);
    }, 4000);
  };

  const generateLink = () => {
    setLink("http://somestuff:yooooo");
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

      {link && (
        <div className="flex gap-4 items-center">
          <Input isDisabled value={link} />
          <SecondaryButton onClick={copyLink}>Copy</SecondaryButton>
        </div>
      )}
      {showPlayerWaitingText && (
        <p className="waiting-text text-center text-3xl">Waiting for Player 2</p>
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

export default WaitingRoom;
