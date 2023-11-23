import { useContext, useEffect } from "react";
import GameStartPage from "./components/pages/gameStartPage.jsx";
import MainGamePage from "./components/pages/mainGamePage.jsx";
import { useSelector } from "react-redux";

function App() {
  const isGameStarted = useSelector((state) => state.game.isGameStarted);

  return isGameStarted ? (
    <MainGamePage />
  ) : (
    <GameStartPage />
  );

}

export default App;
