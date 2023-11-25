function createShip(name, length, id) {
  return {
    name,
    length,
    id,
    placemeantCordinates: [],
    hits: 0,
    isSunk: false,
  };
}

const ships = [
  createShip("Carrier", 5, 1),
  createShip("Battleship", 4, 2),
  createShip("Cruiser", 3, 3),
  createShip("Submarine", 3, 4),
  createShip("Destroyer", 2, 5),
];

export default ships;