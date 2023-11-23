import BoardCell from "./boardCell";
import { useDispatch } from "react-redux";
import { placeShip } from "../../actions/gameActions";
import { useState } from "react";

export default function BoardContainer({ playerBoard, shipToPlace, direction }) {
  const dispatch = useDispatch();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, rowIndex, cellIndex) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const shipData = data.ship;

    try {
      // Dispatch an action to place the ship
      dispatch(placeShip(shipData, rowIndex, cellIndex));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMouseEnter = (rowIndex, cellIndex) => {
    for (let i = 0; i < shipToPlace.length; i++) {
      if (
        (direction === "vertical" && i + rowIndex >= playerBoard.length) ||
        (direction === "horizontal" &&
          i + cellIndex >= playerBoard[0].length) ||
        playerBoard[rowIndex + i][cellIndex].isContainShip
      ) {
        return;
      }

      if (direction === "vertical") {
        playerBoard[rowIndex + i][cellIndex].isYellow = true;
      } else {
        playerBoard[rowIndex][cellIndex + i].isYellow = true;
      }
    }
    setIsMouseDown(true);
  };

  const handleMouseLeave = (rowIndex, cellIndex) => {
    for (let i = 0; i < shipToPlace.length; i++) {
      if (
        (direction === "vertical" && i + rowIndex >= playerBoard.length) ||
        (direction === "horizontal" &&
          i + cellIndex >= playerBoard[0].length) ||
        playerBoard[rowIndex + i][cellIndex].isContainShip
      ) {
        return;
      }

      if (direction === "vertical") {
        playerBoard[rowIndex + i][cellIndex].isYellow = false;
      } else {
        playerBoard[rowIndex][cellIndex + i].isYellow = false;
      }
    }
    setIsMouseDown(false);
  };

  return (
    <div className="gamestart-board">
      <table>
        <tbody>
          {playerBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, rowIndex, cellIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  onMouseLeave={() => handleMouseLeave(rowIndex, cellIndex)}
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
  );
}
