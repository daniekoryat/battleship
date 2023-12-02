import {
  invalidCordinateError,
  notEnoughSpaceError,
  alreadyContainShipError,
} from "../exceptions";
import store from "../store";

/**
 * Generates the initial game board.
 *
 * @param {boolean} isComputer - indicates if the board is for the computer
 * @return {Array} - the initial game board
 */
export function initialBoard(isComputer = false) {
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

  if (isComputer) {
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
  //crate a copy of the ship data to no directly mutate the original ship data
  let ship = {
    ...shipData,
    placemeantCordinates: [...shipData.placemeantCordinates],
  };

  let shipLength = ship.length;

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
    if (direction === "horizontal") {
      if (board[rowIndex][cellIndex + i].isContainShip) {
        throw new alreadyContainShipError();
      }
    } else {
      if (board[rowIndex + i][cellIndex].isContainShip) {
        throw new alreadyContainShipError();
      }
    }
  }

  // Create a new board with the updated placement
  const newBoard = JSON.parse(JSON.stringify(board));

  // Place the ship on the new board
  for (let i = 0; i < shipLength; i++) {
    if (direction === "horizontal") {
      newBoard[rowIndex][cellIndex + i].isContainShip = true;
      ship.placemeantCordinates.push([rowIndex, cellIndex + i]);
    } else {
      newBoard[rowIndex + i][cellIndex].isContainShip = true;
      ship.placemeantCordinates.push([rowIndex + i, cellIndex]);
    }
  }

  return [ship, newBoard];
}

/**
 * Generates a random integer between the given minimum and maximum values.
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The randomly generated integer.
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Display the hover color of a cell on the board.
 *
 * @param {number} rowIndex - The index of the row.
 * @param {number} cellIndex - The index of the cell.
 * @param {Array} board - The game board.
 * @param {Array} shipToPlace - The ship to place.
 * @param {string} direction - The direction of the ship.
 * @param {boolean} isGameStart - Flag indicating if the game has started.
 * @return {void}
 */
export function displayHoverColor(
  rowIndex,
  cellIndex,
  board,
  shipToPlace,
  direction,
  isGameStart
) {
  if (isGameStart) {
    for (let i = 0; i < shipToPlace.length; i++) {
      try {
        if (direction === "vertical") {
          board[rowIndex + i][cellIndex].hoverColor = "yellow";
        } else {
          board[rowIndex][cellIndex + i].hoverColor = "yellow";
        }
      } catch (error) {
        return;
      }
    }
  } else {
    board[rowIndex][cellIndex].hoverColor = "red";
  }
}

/**
 * Cleans the hover color for a cell on the board.
 *
 * @param {number} rowIndex - The row index of the cell.
 * @param {number} cellIndex - The cell index of the cell.
 * @param {Array} board - The game board.
 * @param {Array} shipToPlace - The ship to place on the board.
 * @param {string} direction - The direction of the ship placement.
 * @param {boolean} isGameStart - Indicates whether the game has started.
 * @return {undefined} - No return value.
 */
export function cleanHoverColor(
  rowIndex,
  cellIndex,
  board,
  shipToPlace,
  direction,
  isGameStart
) {
  if (isGameStart) {
    for (let i = 0; i < shipToPlace.length; i++) {
      try {
        if (direction === "vertical") {
          board[rowIndex + i][cellIndex].hoverColor = null;
        } else {
          board[rowIndex][cellIndex + i].hoverColor = null;
        }
      } catch (error) {
        return;
      }
    }
  } else {
    board[rowIndex][cellIndex].hoverColor = null;
  }
}

const checkIfShipSunk = (ship) => {
  return ship.hits === ship.length;
};

export const isAllShipSunk = (ships) => {
  let isWinner = true;

  ships.forEach((ship) => {
    if (!checkIfShipSunk(ship)) {
      isWinner = false;
    }
  });
  return isWinner;
};

/**
 * Generates a valid coordinate for hitting a player on the game board.
 *
 * @return {Array} An array containing the row index and cell index of the valid coordinate.
 */
export const findValidCordinateForHitPlayer = () => {
  const state = store.getState().game;
  const { board } = state.player;

  let [rowIndex, cellIndex] = findAGoodAttackMoove(board);

  if (rowIndex === null || cellIndex === null) {
    while (!rowIndex || board[rowIndex][cellIndex].isAttacked) {
      rowIndex = getRandomInt(0, board.length);
      cellIndex = getRandomInt(0, board[0].length);
    }
  }

  return [rowIndex, cellIndex];
};

function findAGoodAttackMoove(board) {
  var hitCell = null;

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < board[0].length; cellIndex++) {
      if (
        board[rowIndex][cellIndex].isAttacked &&
        board[rowIndex][cellIndex].isContainShip
      ) {
        // Store the cell that was hit
        hitCell = [rowIndex, cellIndex];
        break;
      }
    }
    if (hitCell) break;
  }

  if (hitCell) {
    // If a ship was hit, continue attacking the surrounding cells
    const [rowToHit, cellToHit] = hitCell;
    const cellsToAttack = [
      [rowToHit - 1, cellToHit],
      [rowToHit + 1, cellToHit],
      [rowToHit, cellToHit - 1],
      [rowToHit, cellToHit + 1],
    ];

    // Loop over the cells to attack and attack if they are on the board and not already attacked
    for (const [rowIndex, cellIndex] of cellsToAttack) {
      if (
        rowIndex >= 0 &&
        rowIndex < board.length &&
        cellIndex >= 0 &&
        cellIndex < board[0].length &&
        !board[rowIndex][cellIndex].isAttacked
      ) {
        return [rowIndex, cellIndex];
      }
    }
  }
  return [null, null];
}



