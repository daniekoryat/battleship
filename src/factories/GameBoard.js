import { initialComputersBoard } from "../utils/helpers";
import ship from "../factories/Ship";

export default class GameBoard {
  /**
   * Creates a new instance of the GameBoard class.
   *
   * @param {boolean} isComputer - Indicates whether the game board belongs to the computer player.
   */
  constructor() {
    this.board = []; // The game board
    this.ships = []; // An array to store the ships
    this.lengthValues = [5, 4, 3, 3, 2]; // The lengths of the ships

    // Create rows for the board+
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
 placeShip(ship, x, y, oriontation) {
  // Check if the placement is valid (within the bounds of the board)
  if (x < 0 || x >= 10 || y < 0 || y >= 10) {
    console.error("Invalid placement coordinates.");
    return false;
  }

  // Check if there's enough space to place the ship based on its length and orientation
  if (
    (oriontation === "horizontal" && x + ship.length > 10) ||
    (oriontation === "vertical" && y + ship.length > 10)
  ) {
    console.error("Not enough space to place the ship.");
    return false;
  }

  // Check if there's already a ship at the specified coordinates
  if (this.board[x][y].isContainShip) {
    console.error("There's already a ship at the specified coordinates.");
    return false;
  }

  // Place the ship on the board
  for (let i = 0; i < ship.length; i++) {
    if (oriontation === "horizontal") {
      this.board[x + i][y].isContainShip = true;
      ship.coordinates.push([x + i, y]);
    } else {
      this.board[x][y + i].isContainShip = true;
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
 * @returns {boolean} - True if the attack hits a ship, false otherwise.
 */
 receiveAttack(x, y) {
  try {
    // Check if the attack hits a ship
    const isHit = board[x][y].isContainShip;

    // Mark the cell as attacked
    board[x][y].isMarked = true;

    if (isHit) {
      // Code to handle a hit on a ship

      // Find the ship that was hit
      const hitShip = ships.find((ship) =>
        ship.coordinates.some(([shipX, shipY]) => shipX === x && shipY === y)
      );

      // Update the hit count and check if the ship is sunk or record the missed attack
      hitShip ? hitShip.hit() : null;
    } else {
      // Code to handle a missed attack
      board[x][y].isMissedAttack = true;
    }
  } catch (err) {
    console.error(err);
  }

    return isHit;
}

  /**
   * Checks if all ships are sunk.
   * @returns {boolean} True if all ships are sunk, false otherwise.
   */
   isAllShipsSunk() {
    // Use the `every` array method to check if every ship is sunk.
    return this.ships.every((ship) => ship.isSunk());
  }
}



