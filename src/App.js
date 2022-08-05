import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import "./App.css";

function App() {
  return (
    <div className="font-sunnyspells bg-dark h-screen text-white relative">
      <Router>
        <Routes>
          <Route path="/game/:id" element={<Game />} />

          <Route path="/waiting-room/:id" element={<WaitingRoom />} />

          <Route path="/waiting-room" element={<WaitingRoom />} />

          <Route path="/scoreboard/:id" element={<Scoreboard />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
