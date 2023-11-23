// Importing necessary functions and constants from other files
import { initialBoard } from "../utils/helpers";
import { START_GAME, PLACE_SHIP } from "../actions/actionTypes";
import { placeShipOnBoard } from "../utils/helpers";
import shipList from "../utils/shipList";

// Defining the initial state of the game
const initialState = {
  isGameStarted: false,
  player: {
    board: initialBoard(), // Setting the player's board using the initialBoard function
    ships: [], // Initializing the player's ships array
    shipsToPlace: [...shipList], // Setting the player's shipsToPlace array to a copy of the shipList array
  },
  computer: {
    board: initialBoard(), // Setting the computer's board using the initialBoard function
    ships: [], // Initializing the computer's ships array
  },
};

// Defining the gameReducer function, which takes in the current state and an action as parameters
function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      // When the action type is START_GAME, update the isGameStarted property to true
      return {
        ...state,
        isGameStarted: true,
      };
    case PLACE_SHIP:
      // When the action type is PLACE_SHIP, extract the shipData, rowIndex, cellIndex, and direction from the action object
      const { shipData, rowIndex, cellIndex, direction } = action;
      // Call the placeShipOnBoard function with the current player's board, shipData, rowIndex, cellIndex, and direction as parameters
      const updatedBoard = placeShipOnBoard(
        [...state.player.board],
        shipData,
        rowIndex,
        cellIndex,
        direction
      );

      // Create a new array that contains all the ships except for the placed one
      const updatedShipsToPlace = state.player.shipsToPlace.filter(
        (ship) => ship.id !== shipData.id
      );

      // Return a new state object with the updated player's ships array, board, and the rest of the state properties
      return {
        ...state,
        player: {
          ...state.player,
          ships: [...state.player.ships, action.shipData],
          board: updatedBoard,
          shipsToPlace: [...updatedShipsToPlace],
        },
      };
    default:
      // If the action type is not recognized, return the current state
      return state;
  }
}

// Export the gameReducer function as the default export of this module
export default gameReducer;
