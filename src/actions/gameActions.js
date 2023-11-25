import { START_GAME, PLACE_SHIP } from "./actionTypes";
import {
  placeShipOnBoard,
  getRandomInt,
  isAllShipSunk,
} from "../utils/helpers";

export const startGame = () => ({
  type: START_GAME,
});

/**
 * Place a ship on the board.
 *
 * @param {Object} shipData - the data of the ship to be placed
 * @param {number} rowIndex - the index of the row where the ship will be placed
 * @param {number} cellIndex - the index of the cell where the ship will be placed
 * @param {string} direction - the direction in which the ship will be placed
 * @param {boolean} [isComputer=false] - flag indicating if the player is the computer
 * @return {function} - the action to be dispatched
 */
export const placeShip = (
  shipData,
  rowIndex,
  cellIndex,
  direction,
  isComputer = false
) => {
  return (dispatch, getState) => {
    // Get the current state of the game
    const state = getState().game;
    const gamePlayer = isComputer ? state.computer : state.player;

    // Do the calculations here instead of in the reducer
    const [updatedShip, updatedBoard] = placeShipOnBoard(
      [...gamePlayer.board],
      shipData,
      rowIndex,
      cellIndex,
      direction
    );

    const updatedShipsToPlace = gamePlayer.shipsToPlace.filter(
      (ship) => ship.id !== shipData.id
    );

    // Dispatch the action with the calculated values
    dispatch({
      type: PLACE_SHIP,
      updatedShip,
      updatedBoard,
      updatedShipsToPlace,
      isComputer,
    });
  };
};

/**
 * Places computer ships randomly on the computers board.
 *
 * @param {function} dispatch - The dispatch function from Redux.
 * @param {function} getState - The getState function from Redux.
 * @return {void}
 */
export const placeComputerShipsRandomly = () => {
  return (dispatch, getState) => {
    const state = getState().game;
    let { board, shipsToPlace } = state.computer;

    // Loop through the list of ships to place
    for (let shipData of shipsToPlace) {
      let placed = false;

      // Try to place the ship on the board in a loop until it's placed successfully
      while (!placed) {
        // Generate random coordinates and direction
        const rowIndex = getRandomInt(0, board.length);
        const cellIndex = getRandomInt(0, board[0].length);
        const direction = getRandomInt(0, 2) === 0 ? "horizontal" : "vertical";

        try {
          const [updatedShip, updatedBoard] = placeShipOnBoard(
            [...board],
            shipData,
            rowIndex,
            cellIndex,
            direction
          );

          // If the ship was placed successfully, update the board and break the loop
          if (updatedShip !== null) {
            board = updatedBoard;
            placed = true;

            // Dispatch the PLACE_SHIP action
            dispatch({
              type: PLACE_SHIP,
              updatedShip,
              updatedBoard,
              isComputer: true,
            });
          }
        } catch (error) {}
      }
    }
  };
};

export const hit = (isComputerTheHitter, rowIndex, cellIndex) => {
  return (dispatch, getState) => {
    const state = getState().game;
    const opponnent = isComputerTheHitter ? state.player : state.computer;
    const { ships } = opponnent;
    const opponnentShips = [...ships];

    const { board } = state[isComputerTheHitter ? "player" : "computer"];
    const updatedBoard = board.map((row,i) => {
      return row.map((cell,j) => {
        if (i === rowIndex && j === cellIndex) {
          return {
            ...cell,
            isAttacked: true,
          };
        }
        return {
          ...cell,
        };
      });
    });

    var isShipHited = false;

    const updatedShips = opponnentShips.map((ship) => {
      if (ship.placemeantCordinates.includes([rowIndex, cellIndex])) {
        isShipHited = true;
        return {
          ...ship,
          hits: ship.hits + 1,
        };
      }
      return ship;
    });

    const isAllOppenentShipsSunk = isAllShipSunk(updatedShips);
    const winner = isAllOppenentShipsSunk
      ? isComputerTheHitter
        ? "player"
        : "computer"
      : null;

    dispatch({
      type: "HIT",
      updatedHittedBord: updatedBoard,
      isComputerHitted: isComputerTheHitter,
      updatedShips,
      winner,
    });
  };
};
