import { useParams } from "react-router-dom";
import Player1 from "./player1";
import Player2 from "./player2";
import "./index.css";

const WaitingRoom = () => {
  const { id } = useParams();

  const render = () => {
    if (id) return <Player2 />;
    return <Player1 />;
  };

  return render();
};

export default WaitingRoom;
