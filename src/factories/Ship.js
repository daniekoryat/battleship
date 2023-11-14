// Factory function to create a ship object
/**
 * Creates a ship object with the specified length.
 * @param {number} length - The length of the ship.
 * @returns {object} - The ship object.
 */
function createShip(length) {
  let id = 0;
  let coordinates = [];

  const isSunk = () => {
    return this.hits === this.length;
  }
  
  return {
    id: ++id,
    length: length,
    hits: 0,
    coordinates: coordinates,
    /**
     * Increments the hit count of the ship and checks if it is sunk.
     */
    hit: function() {
      this.hits++;
      }
    }
  };


// Exporting the factory function
export default createShip;