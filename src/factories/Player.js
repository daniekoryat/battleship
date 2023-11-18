import GameBoard from "./GameBoard";
import shipslist from '../utils/shipList';
import ship from "./Ship";

export default class Player {
  /**
   * Initialize the player's ships
   * @param {boolean} isComputer - Indicates whether the player is a computer
   */
  constructor(isComputer) {
    this.isComputer = isComputer;
    this.board = new GameBoard(isComputer);
    this.ships = [];   

    // If the player is a computer, randomly place the ships on the board
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


  /**
   * Attack the opponent at the specified coordinates
   * @param {number} x - The x-coordinate of the attack
   * @param {number} y - The y-coordinate of the attack
   * @param {Player} player - The opponent player
   */
  attackOpponent(x, y, player) {
    player.board.receiveAttack(x, y);
  }
}