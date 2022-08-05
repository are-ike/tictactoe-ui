import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";

const rowClassnames = "border-b p-4";
const Scoreboard = () => {
  const [players, setPlayers] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem(`scores-${id}`)) ?? {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl mb-8 text-center">Scoreboard</h2>
      <div className="grid grid-cols-2 mb-20 text-3xl border border-b-0">
        <div className="border">
          <div className={rowClassnames}>{players[1]?.name}</div>
          <div className={rowClassnames}>{players[1]?.score}</div>
        </div>
        <div className="border">
          <div className={rowClassnames}>{players[2]?.name}</div>
          <div className={rowClassnames}>{players[2]?.score}</div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <SecondaryButton isLink link="/">
          End game
        </SecondaryButton>
        <PrimaryButton isLink link="/game">
          Play again
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Scoreboard;
