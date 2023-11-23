import BoardContainer from "../board/boardContainer";
import GamestartShips from "../otherComponents/gametartShips";
import { Button } from "bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../../actions/gameActions";
import { useState } from "react";

export default function gameStartPage() {
  const [direction, setDirection] = useState("vertical");
  const playerBoard = useSelector((state) => state.game.player.board);
  const shipList = useSelector((state) => state.game.player.shipsToPlace);
  const shipToPlace = shipList[0];
  const dispatch = useDispatch();

  return (
    <>
      <h1>Place your ships</h1>
      <h3>
        ship: {shipToPlace.name} leangth: {shipToPlace.length}
      </h3>
      <h4
        onClick={() =>
          setDirection(direction === "vertical" ? "horizontal" : "vertical")
        }
        style={{ cursor: "pointer" }}
      >
        Direction: {direction} (click to change)
      </h4>
      <div className="gamestart-container">
        <BoardContainer playerBoard={playerBoard} shipToPlace={shipToPlace} />
      </div>
      <br />
      <button
        className="button"
        onClick={() => dispatch(startGame())}
        disabled={shipList.length !== 0}
      >
        start game
      </button>
    </>
  );
}

{
  /* <GamestartShips shipList={shipList} /> */
}
