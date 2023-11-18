import { describe, test, expect, beforeEach } from "vitest";
import Player from "../../factories/Player.js";
import GameBoard from "../../factories/GameBoard.js";
import Ship from "../../factories/Ship.js";
import shiplist from "../../utils/shipList.js";

describe("Player class", () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player(false);
    computer = new Player(true);
  });

  test("should create a Player object", () => {
    expect(player).toBeInstanceOf(Player);
  });

  test("should attack the opponent", () => {
    player.attackOpponent(0, 0, computer);
    expect(computer.board.acsessCell(0, 0).isMarked).toBe(true);
  });

  
  test("should place a ship in a location",() => {
    const ship = new Ship(3, "Destroyer");
    player.board.placeShip(ship, 0, 0, "horizontal");
    expect(player.board.acsessCell(0, 0).isContainShip).toBe(true);
  })  
});
