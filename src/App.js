import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import './App.css'

function App() {
  return (
    <div className="font-sunnyspells bg-dark h-screen text-white">
      <Router>
        <Routes>
          <Route path="/game" element={<Game />} />

          <Route path="/waiting-room" element={<WaitingRoom />} />

          <Route path="/scoreboard" element={<Scoreboard />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
