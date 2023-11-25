import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { placeShip, hit } from "../../actions/gameActions";
import { displayHoverColor, cleanHoverColor } from "../../utils/helpers";
import BoardCell from "./boardCell";

export default function BoardContainer({
  recivedBoard,
  shipToPlace,
  direction,
  isGameStart,
}) {
  const dispatch = useDispatch();
  const [, forceUpdate] = useState();
  const localBoardRef = useRef(recivedBoard);
  const isPlayerBord =
    useSelector((state) => state.game.player.board) === recivedBoard;
  const isPlayerTurn = useSelector((state) => state.game.isPlayerTurn);

  useEffect(() => {
    localBoardRef.current = recivedBoard;
    forceUpdate((n) => !n);
  }, [recivedBoard]);

  const handleMouseEnter = (rowIndex, cellIndex) => {
    if (!shipToPlace && isGameStart) return;

    const newBoard = localBoardRef.current.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    displayHoverColor(
      rowIndex,
      cellIndex,
      newBoard,
      shipToPlace,
      direction,
      isGameStart
    );

    localBoardRef.current = newBoard;
    forceUpdate((n) => !n);
  };

  const handleMouseLeave = (rowIndex, cellIndex) => {
    if (!shipToPlace && isGameStart) return;

    const newBoard = localBoardRef.current.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    cleanHoverColor(
      rowIndex,
      cellIndex,
      newBoard,
      shipToPlace,
      direction,
      isGameStart
    );

    localBoardRef.current = newBoard;
    forceUpdate((n) => !n);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    if (isGameStart && shipToPlace) {
      try {
        dispatch(placeShip(shipToPlace, rowIndex, cellIndex, direction));
      } catch (error) {
        if (!(error instanceof TypeError)) {
          alert(error.message);
        }
      }
    } else if (!isGameStart && isPlayerTurn && !isPlayerBord) {
      dispatch(hit(false, rowIndex, cellIndex));
    }
  };

  return (
    <div className="board">
      <h2>{isPlayerBord ? "Your Board" : "Opponent Board"}</h2>
      <table>
        <tbody>
          {localBoardRef.current.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  onMouseLeave={() => handleMouseLeave(rowIndex, cellIndex)}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  <BoardCell
                    isContainShip={cell.isContainShip}
                    isAttacked={cell.isAttacked}
                    hoverColor={cell.hoverColor}
                    isPlayerBord={isPlayerBord}
                    isGameStart={isGameStart}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
