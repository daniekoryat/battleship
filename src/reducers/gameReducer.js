// Importing necessary functions and constants from other files
import { initialBoard } from "../utils/helpers";
import { START_GAME, PLACE_SHIP } from "../actions/actionTypes";
import shipList from "../utils/shipList";

// Defining the initial state of the game
const initialState = {
  isGameStarted: false,
  isPlayerTurn: true,
  winner: null,
  player: {
    board: initialBoard(), // Setting the player's board using the initialBoard function
    ships: [], // Initializing the player's ships array
    shipsToPlace: [...shipList], // Setting the player's shipsToPlace array to a copy of the shipList array
  },
  computer: {
    board: initialBoard(), // Setting the computer's board using the initialBoard function
    ships: [], // Initializing the computer's ships array
    shipsToPlace: [...shipList], // Setting the computer's shipsToPlace array to a copy of the shipList array
  },
};

// Defining the gameReducer function, which takes in the current state and an action as parameters
function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isGameStarted: true,
      };
    case PLACE_SHIP:
      const { updatedShip, updatedBoard, updatedShipsToPlace, isComputer } =
        action;
      return {
        ...state,
        [isComputer ? "computer" : "player"]: {
          ...state[isComputer ? "computer" : "player"],
          ships: [
            ...state[isComputer ? "computer" : "player"].ships,
            updatedShip,
          ],
          board: updatedBoard,
          shipsToPlace: updatedShipsToPlace,
        },
      };
    case "HIT":
      const { updatedHittedBord, updatedShips, winner, isComputerHitted } =
        action;
      return {
        ...state,
        [isComputerHitted ? "player" : "computer"]: {
          ...state[isComputerHitted ? "player" : "computer"],
          board: updatedHittedBord,
          ships: updatedShips,
        },
        winner,
      };
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return state;
  }
}

// Export the gameReducer function as the default export of this module
export default gameReducer;
