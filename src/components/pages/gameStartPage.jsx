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
  const shipToPlace = shipList ? shipList[0] : null;
  const dispatch = useDispatch();

  return (
    <>
      <h1>Place your ships</h1>
      {shipToPlace ? <h3>ship: {shipToPlace.name} leangth: {shipToPlace.length}</h3> : <h3>all your ship is set</h3>}
      <h4
        onClick={() =>
          setDirection(direction === "vertical" ? "horizontal" : "vertical")
        }
        style={{ cursor: "pointer" }}
      >
        Direction: {direction} (click to change)
      </h4>
      <div className="gamestart-container">
        <BoardContainer board={playerBoard} shipToPlace={shipToPlace} direction={direction} />
      </div>
      <br />
      <button
        className="button"
        onClick={() => dispatch(startGame())}
        disabled={shipToPlace ? true : false}
      >
        start game
      </button>
    </>
  );
}

{
  /* <GamestartShips shipList={shipList} /> */
}
