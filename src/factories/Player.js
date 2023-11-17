import createShip from "./Ship";
import GameBoard from "./GameBoard";
import shipslist from '../'
import ship from "./Ship";
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

      if (isComputer) {
        shipslist.forEach((shipFromList) => {
          const shipToPlace = new ship(shipFromList.length,shipFromList.name);
          let isValid = false;
          do {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
            isValid = this.board.placeShip(shipToPlace, x, y, orientation);
          } while (!isValid);
        });
      }
    }

     attackOpponent(x,y,player) {
      player.board.receiveAttack(x,y);
    }

  }



