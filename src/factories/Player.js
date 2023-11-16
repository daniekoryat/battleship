import createShip from "./Ship";
import GameBoard from "./GameBoard";

/**
 * Creates a Player object.
 * @param {boolean} isComputer - Indicates whether the player is a computer.
 * @returns {Object} - The Player object.
 */
export default class Player {
    // Initialize the player's ships
    constructor(isComputer) {
      this.isComputer = isComputer;
      this.board = new GameBoard(isComputer);
      this.ships = [];   
    }
    
}

