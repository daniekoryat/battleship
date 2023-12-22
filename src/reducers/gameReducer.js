// Importing necessary functions and constants from other files
import { initialBoard } from "../utils/helpers";
import { START_GAME, PLACE_SHIP,HIT,RESET_GAME } from "../actions/actionTypes";
import shipList from "../utils/shipList";

// Defining the initial state of the game
const initialState = {
  isGameStarted: false,
  isPlayerTurn: true,
  winner: null,
  player: {
    board: initialBoard(), 
    ships: [],
    shipsToPlace: [...shipList],
  },
  computer: {
    board: initialBoard(), 
    ships: [], 
    shipsToPlace: [...shipList], 
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
    case HIT:
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
        isPlayerTurn: !state.isPlayerTurn, 
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}

// Export the gameReducer function as the default export of this module
export default gameReducer;
