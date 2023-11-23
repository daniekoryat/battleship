import {
  invalidCordinateError,
  notEnoughSpaceError,
  alreadyContainShipError,
} from "../exceptions";

export function initialBoard() {
  const board = [];

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push({
        isContainShip: false,
        isAttacked: false,
      });
    }
    board.push(row);
  }

  return board;
}

/**
 * Places a ship on the board at the specified coordinates and direction.
 *
 * @param {Array} board - the game board
 * @param {Array} shipData - the data of the ship to be placed
 * @param {number} rowIndex - the starting row index of the ship
 * @param {number} cellIndex - the starting cell index of the ship
 * @param {string} direction - the direction of the ship ("horizontal" or "vertical")
 * @throws {invalidCordinateError} if the placement is out of bounds
 * @throws {notEnoughSpaceError} if there is not enough space to place the ship
 * @throws {alreadyContainShipError} if there is already a ship at the specified coordinates
 * @return {Array} the updated game board
 */
export function placeShipOnBoard(
  board,
  shipData,
  rowIndex,
  cellIndex,
  direction
) {
  const shipLength = shipData.length;

  // Check if the placement is valid (within the bounds of the board)
  if (
    rowIndex < 0 ||
    rowIndex >= board.length ||
    cellIndex < 0 ||
    cellIndex >= board[0].length
  ) {
    throw new invalidCordinateError();
  }

  // Check if there's enough space to place the ship based on its length and direction
  if (
    (direction === "horizontal" && cellIndex + shipLength > board[0].length) ||
    (direction === "vertical" && rowIndex + shipLength > board.length)
  ) {
    throw new notEnoughSpaceError();
  }

  // Check if there's already a ship at the specified coordinates
  for (let i = 0; i < shipLength; i++) {
    try {
      if (
        board[rowIndex][cellIndex + i].isContainShip ||
        board[rowIndex + i][cellIndex].isContainShip
      ) {
        throw new alreadyContainShipError();
      }
    } catch (error) {
      console.error(error);
      return board;
            
    }
  }

  // Create a new board with the updated placement
  const newBoard = JSON.parse(JSON.stringify(board));

  // Place the ship on the new board
  for (let i = 0; i < shipLength; i++) {
    if (direction === "horizontal") {
      newBoard[rowIndex][cellIndex + i].isContainShip = true;
    } else {
      newBoard[rowIndex + i][cellIndex].isContainShip = true;
    }
  }

  return newBoard;
}
