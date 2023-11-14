import createShip from "./Ship";

/**
 * Creates a Player object.
 * @param {boolean} isComputer - Indicates whether the player is a computer.
 * @returns {Object} - The Player object.
 */
function Player(isComputer) {
    // Initialize the player's ships
    const ships = [];
    const lengthValues = [3, 3, 4, 4, 5];
    let isValidPlacement;

    // Loop through the length values array
    lengthValues.forEach((length) => {
      // Call the createShip function with the current length value
      ships.push(createShip(length));
    });


    return {
      ships: ships,
    }
}


/*
  if (isComputer) {
      // Randomly place the computer's ships
      ships.forEach((ship) => {
        do {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let orientation = Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";
            isValidPlacement = placeShip(ship, x, y, orientation);
        } while (isValidPlacement === false);    
      });
    } 
*/