import BoardCell from "./boardCell"; // Importing the BoardCell component
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { placeShip } from "../../actions/gameActions"; // Importing the placeShip action from gameActions
import { useState, useEffect, useRef } from "react"; // Importing useState hook from react

export default function BoardContainer({
  recivedBoard,
  shipToPlace,
  direction,
  isGameStart,
}) {
  const dispatch = useDispatch(); // Initializing the useDispatch hook to dispatch actions
  const [, forceUpdate] = useState();
  const localBoardRef = useRef(recivedBoard);

  useEffect(() => {
    localBoardRef.current = recivedBoard;
    forceUpdate((n) => !n);
  }, [recivedBoard]);

  //determain witch player board is it
  const isPlayerBord =
    useSelector((state) => state.game.player.board) === recivedBoard;

  // Handling the mouse enter event on board cells
  const handleMouseEnter = (rowIndex, cellIndex) => {
    if (!shipToPlace && isGameStart) {
      return; // If there is no ship to place, return
    }
    const newBoard = localBoardRef.current.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    if (isGameStart) {
      // Looping through the shipToPlace array
      for (let i = 0; i < shipToPlace.length; i++) {
        try {
          if (direction === "vertical") {
            newBoard[rowIndex + i][cellIndex].hoverColor = "yellow";
          } else {
            newBoard[rowIndex][cellIndex + i].hoverColor = "yellow";
          }
        } catch (error) {
          return;
        }
      }
    } else if (!isPlayerBord) {
      newBoard[rowIndex][cellIndex].hoverColor = "red";
    }
    localBoardRef.current = newBoard;
    forceUpdate((n) => !n);
  };

  // Handling the mouse leave event on board cells
  const handleMouseLeave = (rowIndex, cellIndex) => {
    if (!shipToPlace && isGameStart) {
      return; // If there is no ship to place, return
    }

    const newBoard = localBoardRef.current.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    if (isGameStart) {
      // Looping through the shipToPlace array
      for (let i = 0; i < shipToPlace.length; i++) {
        try {
          if (direction === "vertical") {
            newBoard[rowIndex + i][cellIndex].hoverColor = undefined;
          } else {
            newBoard[rowIndex][cellIndex + i].hoverColor = undefined;
          }
        } catch (error) {
          return;
        }
      }
    } else {
      newBoard[rowIndex][cellIndex].hoverColor = undefined;
    }
    localBoardRef.current = newBoard;
    forceUpdate((n) => !n);
  };

  // This function is called when a cell on the board is clicked
  const handleCellClick = (rowIndex, cellIndex) => {
    // If there is no ship to place, return and do nothing
    if (!shipToPlace && !isGameStart) {
      return;
    }

    try {
      // Try to dispatch the action to place the ship
      dispatch(placeShip(shipToPlace, rowIndex, cellIndex, direction));
    } catch (error) {
      // If an error occurs, show an alert with the error message
      alert(error.message);
    }
  };

  // This function is called to clean the board by removing any previous markings

  return (
    <>
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
    </>
  );
}
