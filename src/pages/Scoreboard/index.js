import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";

const Scoreboard = () => {
  return (
    <div>
      <div className="grid-cols-2">
        <div>0</div>
        <div>0</div>
      </div>
      <div>
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
