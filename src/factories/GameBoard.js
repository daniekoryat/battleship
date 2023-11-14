import createShip from "./Ship";

// Factory function to create a game board object
function createGameBoard() {
    const board = [];
    const ships = [];
  
    // Create rows for the board
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        // Initialize each cell object
        row.push({ cell : {
            isMarked: false,
            isContainShip: false,
            isMissedAttack: false,
        }
        });
      }
      board.push(row);
    }
  
    /**
     * Place a ship on the game board.
     * @param {object} ship - The ship object to be placed.
     * @param {number} x - The x-coordinate of the ship's placement.
     * @param {number} y - The y-coordinate of the ship's placement.
     * @param {string} orientation - The orientation of the ship ("horizontal" or "vertical").
     */
    function placeShip(ship, x, y, orientation) {
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
      ships.push(ship); 
    }
  
    function MakeAttack(x, y) {
        board[x][y].isMarked = true;
        if (board[x][y].isContainShip) {
          // Code to handle a hit on a ship
          const hitShip = ships.find((ship) =>
            ship.coordinates.some(([shipX, shipY]) => shipX === x && shipY === y)
          );
      
          // Update the hit count and check if the ship is sunk or record the missed attack
          hitShip ? hitShip.hit() : board[x][y].isMissedAttack = true;
        }
      }

      // Function to check if all ships are sunk
      function isAllShipsSunk() {
        return ships.every((ship) => ship.isSunk());
      }
      
  
    return {
      board: board,
      placeShip: placeShip,
      ships: ships, // Expose the ships array for external access
      MakeAttack: MakeAttack,
    };
  }

  
  // Exporting the factory function
  export default createGameBoard;