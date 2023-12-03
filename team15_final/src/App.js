import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Hangman } from "./components/Pages/Hangman";
//import { Minesweeper } from "./components/Pages/Minesweeper";
import Minesweeper from "./components/Pages/Minesweeper";

import { About } from "./components/Pages/About";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/minesweeper" element={<Minesweeper />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
