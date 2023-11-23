// import { initialComputersBoard } from "../utils/helpers";
// import ship from "../factories/Ship";

// export default class GameBoard {
//   /**
//    * Creates a new instance of the GameBoard class.
//    *
//    * @param {boolean} isComputer - Indicates whether the game board belongs to the computer player.
//    */
//   constructor() {
//     this.board = []; // The game board
//     this.ships = []; // An array to store the ships

//     // Create rows for the board+
//     for (let i = 0; i < 10; i++) {
//       let row = [];
//       for (let j = 0; j < 10; j++) {
//         // Initialize each cell object
//         row.push({
//           isMarked: false, // Indicates whether the cell has been marked
//           isContainShip: false, // Indicates whether the cell contains a ship
//           isMissedAttack: false, // Indicates whether the cell represents a missed attack
//         });
//       }
//       this.board.push(row);
//     }
//   }

//   acsessCell(x, y) {
//     return this.board[x][y];
//   }

//   /**
//    * Place a ship on the game board.
//    *
//    * @param {object} ship - The ship object to be placed.
//    * @param {number} x - The x-coordinate of the ship's placement.
//    * @param {number} y - The y-coordinate of the ship's placement.
//    * @param {string} orientation - The orientation of the ship ("horizontal" or "vertical").
//    * @returns {boolean} - Returns true if the ship was successfully placed, false otherwise.
//    */
//   placeShip(ship, y, x, oriontation) {
//     // Check if the placement is valid (within the bounds of the board)
//     if (x < 0 || x >= 10 || y < 0 || y >= 10) {
//       console.log("Invalid placement coordinates.");
//       return false;
//     }

//     // Check if there's enough space to place the ship based on its length and orientation
//     if (
//       (oriontation === "horizontal" && x + ship.length > 10) ||
//       (oriontation === "vertical" && y + ship.length > 10)
//     ) {
//       console.log("Not enough space to place the ship.");
//       return false;
//     }

//     // Check if there's already a ship at the specified coordinates
//     if (this.board[x][y].isContainShip) {
//       console.log("There's already a ship at the specified coordinates.");
//       return false;
//     }

//     // Place the ship on the board
//     for (let i = 0; i < ship.length; i++) {
//       if (oriontation === "horizontal") {
//         this.board[x + i][y].isContainShip = true;
//         ship.coordinates.push([x + i, y]);
//       } else {
//         this.board[x][y + i].isContainShip = true;
//         ship.coordinates.push([x, y + i]);
//       }
//     }

//     // Add the ship to the ships array
//     this.ships.push(ship);
//     return this;
//   }

//   /**
//    * Receives an attack on the game board.
//    *
//    * @param {number} x - The x-coordinate of the attack.
//    * @param {number} y - The y-coordinate of the attack.
//    * @returns {boolean} - True if the attack is valid, false otherwise.
//    */
//   receiveAttack(x, y) {
//     try {
//       // Check if the attack coordinates are valid
//       const isValidAttack = this.isValidAttack(x, y);

//       if (!isValidAttack) {
//         console.error("Invalid attack coordinates.");
//         return false;
//       }

//       // Mark the cell as attacked and check if it's a hit
//       const isHit = this.markCellAsAttacked(x, y);

//       if (isHit) {
//         // Handle a hit on a ship
//         this.handleHitOnShip(x, y);
//       } else {
//         // Handle a missed attack
//         this.handleMissedAttack(x, y);
//       }

//       return true;
//     } catch (err) {
//       console.error(err);
//       return false;
//     }
//   }

//   isValidAttack(x, y) {
//     return x >= 0 && x < 10 && y >= 0 && y < 10 && !this.board[x][y].isMarked;
//   }

//   markCellAsAttacked(x, y) {
//     const isHit = this.board[x][y].isContainShip;
//     this.board[x][y].isMarked = true;
//     return isHit;
//   }

//   handleHitOnShip(x, y) {
//     const hitShip = this.findHitShip(x, y);
//     hitShip && hitShip.hit();
//   }

//   findHitShip(x, y) {
//     return this.ships.find((ship) =>
//       ship.coordinates.some(([shipX, shipY]) => shipX === x && shipY === y)
//     );
//   }

//   handleMissedAttack(x, y) {
//     this.board[x][y].isMissedAttack = true;
//   }
//   /**
//    * Checks if all ships are sunk.
//    * @returns {boolean} True if all ships are sunk, false otherwise.
//    */
//   isAllShipsSunk() {
//     // Use the `every` array method to check if every ship is sunk.
//     return this.ships.every((ship) => ship.isSunk());
//   }
// }
