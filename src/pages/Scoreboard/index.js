import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal";
import SecondaryButton from "../../components/button/SecondaryButton";

const rowClassnames = "border-b px-4 py-8 border-teal text-center";
const Scoreboard = ({ show, setShow, players }) => {
  const [scores, setScores] = useState([0, 0]);
  const { id } = useParams();

  useEffect(() => {
    const prevScores = localStorage.getItem(`scores-${id}`)
    if(prevScores){
      setScores(
        Object.values(JSON.parse(prevScores)).map(
          (x) => x.score
        )
      );
    }
  }, [show]);

  return (
    <Modal show={show} className={"text-pink"}>
      <h2 className="text-2xl text-center mb-4">Scoreboard</h2>
      <div className="grid grid-cols-2 mb-12 text-3xl border border-b-0 w-full border-teal">
        <div className="border border-teal">
          <div className={rowClassnames}>{players[0]?.playerName}</div>
          <div className={rowClassnames}>{scores[0]}</div>
        </div>
        <div className="border border-teal">
          <div className={rowClassnames}>{players[1]?.playerName}</div>
          <div className={rowClassnames}>{scores[1]}</div>
        </div>
      </div>

      <SecondaryButton
        className="border-pink text-pink"
        onClick={() => setShow(false)}
      >
        close
      </SecondaryButton>
    </Modal>
  );
};

export default Scoreboard;
