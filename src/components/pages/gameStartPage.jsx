import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  placeComputerShipsRandomly,
} from "../../actions/gameActions";
import BoardContainer from "../board/boardContainer";

export default function gameStartPage() {
  const [direction, setDirection] = useState("vertical");
  const playerBoard = useSelector((state) => state.game.player.board);
  const shipList = useSelector((state) => state.game.player.shipsToPlace);
  const shipToPlace = shipList ? shipList[0] : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeComputerShipsRandomly());
  }, []);

  return (
    <>
      <h1>Place your ships</h1>
      {shipToPlace ? (
        <h3>
          ship: {shipToPlace.name} leangth: {shipToPlace.length}
        </h3>
      ) : (
        <h3>all your ship is set</h3>
      )}
      <h4
        onClick={() =>
          setDirection(direction === "vertical" ? "horizontal" : "vertical")
        }
        style={{ cursor: "pointer" }}
      >
        Direction: {direction} (click to change)
      </h4>
      <div className="gamestart-container">
        <BoardContainer
          recivedBoard={playerBoard}
          shipToPlace={shipToPlace}
          direction={direction}
          isGameStart={true}
        />
      </div>
      <br />
      <button
        type="button"
        className="button"
        onClick={() => dispatch(startGame())}
        disabled={shipToPlace ? true : false}
      >
        start game
      </button>
    </>
  );
}
