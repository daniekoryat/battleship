import { describe, test, expect, beforeEach } from "vitest";
import Player from "../../factories/Player.js";
import GameBoard from "../../factories/GameBoard.js";
import Ship from "../../factories/Ship.js";

describe("Ship class", () => {
  test("should create a Ship object", () => {
    const ship = new Ship(3, "Destroyer");
    expect(ship).toBeInstanceOf(Ship);
  });

  test("should have correct length", () => {
    const ship = new Ship(4, "Cruiser");
    expect(ship.length).toBe(4);
  });

  test("should have correct name", () => {
    const ship = new Ship(5, "Battleship");
    expect(ship.name).toBe("Battleship");
  });

  test("should be initially not sunk", () => {
    const ship = new Ship(3, "Submarine");
    expect(ship.isSunk()).toBe(false);
  });

  test("should be able to be hit", () => {
    const ship = new Ship(2, "Patrol Boat");
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("should be able to be sunk", () => {
    const ship = new Ship(3, "Destroyer");
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
