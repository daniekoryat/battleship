import { useContext, useEffect } from "react";
import GameContext, { GameContextProvider } from "./gameContext";
import Player from "./factories/Player";
import GameStartPage from "./components/pages/gameStartPage.jsx";
import MainGamePage from "./components/pages/mainGamePage.jsx";

function App() {
  const { gameData, setGameData } = useContext(GameContext);

  useEffect(() => {
    setGameData({
      player: new Player(false),
      computer: new Player(true),
      isGameStarted: false,
    });
  }, []);

  return gameData.isGameStarted ? <MainGamePage /> : <GameStartPage />;
}

export default App;
