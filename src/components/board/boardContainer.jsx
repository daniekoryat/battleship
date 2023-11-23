import BoardCell from "./boardCell";
import { useDispatch,useSelector } from "react-redux";
import { placeShip } from "../../actions/gameActions";
import { useState } from "react";

export default function BoardContainer({ board, shipToPlace, direction }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const dispatch = useDispatch();

  const boardTitle = useSelector((state) => state.game.player.board) === board ? "Your Board" : "Opponent Board";

  const handleMouseEnter = (rowIndex, cellIndex) => {
    if (!shipToPlace) {
      return;
    }

    for (let i = 0; i < shipToPlace.length; i++) {
      if (
        (direction === "vertical" && i + rowIndex >= board.length) ||
        (direction === "horizontal" && i + cellIndex >= board[0].length) ||
        board[rowIndex + i][cellIndex].isContainShip
      ) {
        return;
      }

      if (direction === "vertical") {
        board[rowIndex + i][cellIndex].isYellow = true;
      } else {
        board[rowIndex][cellIndex + i].isYellow = true;
      }
      setIsMouseDown(true);
    }
  };

  const handleMouseLeave = (rowIndex, cellIndex) => {
    if (!shipToPlace) {
      return;
    }

    for (let i = 0; i < shipToPlace.length; i++) {
      if (
        (direction === "vertical" && i + rowIndex >= board.length) ||
        (direction === "horizontal" && i + cellIndex >= board[0].length) ||
        board[rowIndex + i][cellIndex].isContainShip
      ) {
        return;
      }

      if (direction === "vertical") {
        board[rowIndex + i][cellIndex].isYellow = false;
      } else {
        board[rowIndex][cellIndex + i].isYellow = false;
      }
      setIsMouseDown(false);
    }
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    if (!shipToPlace) {
      return;
    }

    cleanBoard();
    dispatch(placeShip(shipToPlace, rowIndex, cellIndex, direction));
    try {
      // Dispatch an action to place the ship
    } catch (error) {
      alert(error.message);
    }
  };

  const cleanBoard = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        delete cell.isYellow;
      });
    });
  };

  return (
    <>
      <div className="board">
        <h2>{boardTitle}</h2>
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
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
                      isYellow={cell.isYellow}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
