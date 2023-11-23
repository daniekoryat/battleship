// // Factory function to create a ship object
// /**
//  * Represents a ship object.
//  * @class
//  */
// class Ship {

//   /**
//    * Creates a ship object with the specified length.
//    * @constructor
//    * @param {number} length - The length of the ship.
//    */
//   constructor(length,name) {
//     this.name = name
//     this.length = length;
//     this.hits = 0;
//     this.coordinates = [];
//   }
  
//   /**
//    * Checks if the ship is sunk.
//    * @returns {boolean} - True if the ship is sunk, false otherwise.
//    */
//   isSunk() {
//     return this.hits === this.length;
//   }
  
//   /**
//    * Increases the hit count of the ship.
//    */
//   hit() {
//     this.hits++;
//   }
// }

// // Exporting the ship class
// export default Ship;