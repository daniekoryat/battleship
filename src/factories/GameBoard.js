import { initialComputersBoard } from "../utils/helpers";
import ship from "../factories/Ship";

class GameBoard {
  /**
   * Creates a new instance of the GameBoard class.
   *
   * @param {boolean} isComputer - Indicates whether the game board belongs to the computer player.
   */
  constructor(isComputer) {
     this.board = []; // The game board
     this.ships = []; // An array to store the ships
     this.lengthValues = [5, 4, 3, 3, 2]; // The lengths of the ships

    // Create rows for the board
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        // Initialize each cell object
        row.push({
            isMarked: false, // Indicates whether the cell has been marked
            isContainShip: false, // Indicates whether the cell contains a ship
            isMissedAttack: false, // Indicates whether the cell represents a missed attack
        });
      }
      this.board.push(row);
    }

    if (isComputer) {
      lengthValues.forEach((length) => {
        const ship = new ship(length);
        let isValid = false;

        do {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let orientation = Math.random() < 0.5  ? 'horizontal' : 'vertical';       
            isValid = board.placeShip(ship, x, y, orientation);
        } while (!isValid);
    })
    }

  }

  /**
   * Place a ship on the game board.
   *
   * @param {object} ship - The ship object to be placed.
   * @param {number} x - The x-coordinate of the ship's placement.
   * @param {number} y - The y-coordinate of the ship's placement.
   * @param {string} orientation - The orientation of the ship ("horizontal" or "vertical").
   * @returns {boolean} - Returns true if the ship was successfully placed, false otherwise.
   */
  placeShip(ship, x, y, orientation) {
    // Check if the placement is valid (within the bounds of the board)
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      console.error("Invalid placement coordinates.");
      return false;
    }

    // Check if there's enough space to place the ship based on its length and orientation
    if (
      (orientation === "horizontal" && x + ship.length > 10) ||
      (orientation === "vertical" && y + ship.length > 10)
    ) {
      console.error("Not enough space to place the ship.");
      return false;
    }

    // Check if there's already a ship at the specified coordinates
    if (board[x][y].cell.isContainShip) {
      console.error("There's already a ship at the specified coordinates.");
      return false;
    }

    // Place the ship on the board
    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        board[x + i][y].isContainShip = true;
        ship.coordinates.push([x + i, y]);
      } else {
        board[x][y + i].isContainShip = true;
        ship.coordinates.push([x, y + i]);
      }
    }

    // Add the ship to the ships array
    this.ships.push(ship);
    return true;
  }

  /**
   * Receives an attack on the game board.
   *
   * @param {number} x - The x-coordinate of the attack.
   * @param {number} y - The y-coordinate of the attack.
   */
  receiveAttack(x, y) {
    board[x][y].isMarked = true;

    if (board[x][y].isContainShip) {
      // Code to handle a hit on a ship

      // Find the ship that was hit
      const hitShip = ships.find((ship) =>
        ship.coordinates.some(([shipX, shipY]) => shipX === x && shipY === y)
      );

      // Update the hit count and check if the ship is sunk or record the missed attack
      hitShip ? hitShip.hit() : null;
    } else {
      // Code to handle a missed attack
      board[x][y].isMissedAttack = true
    }
  }

  /**
   * Checks if all ships are sunk.
   * @returns {boolean} True if all ships are sunk, false otherwise.
   */
  isAllShipsSunk() {
      // Use the `every` array method to check if every ship is sunk.
      return ships.every((ship) => ship.isSunk());
  }
}