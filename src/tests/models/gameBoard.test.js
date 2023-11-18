import { describe, test, expect, beforeEach } from "vitest";
import Player from "../../factories/Player.js";
import GameBoard from "../../factories/GameBoard.js";
import Ship from "../../factories/Ship.js";
import shiplist from "../../utils/shipList.js";

describe("GameBoard class", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard(false);
  });

  test("should create a GameBoard object", () => {
    expect(gameBoard).toBeInstanceOf(GameBoard);
  });

  test("should return the correct cell when accessing a cell on the game board", () => {
    const gameBoard = new GameBoard();
    const cell = gameBoard.acsessCell(0, 0);
    expect(cell).toEqual({
      isMarked: false,
      isContainShip: false,
      isMissedAttack: false,
    });
  });

  test("should place a ship on the game board", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "Destroyer");
    gameBoard.placeShip(ship, 0, 0, "horizontal");
    const cell = gameBoard.acsessCell(0, 0);
    expect(cell.isContainShip).toBe(true);
  });

  test("should mark a cell as attacked and return true if it contains a ship", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "Destroyer");
    gameBoard.placeShip(ship, 0, 0, "horizontal");
    const isHit = gameBoard.markCellAsAttacked(0, 0);
    expect(isHit).toBe(true);
  });

  test("should mark a cell as attacked and return false if it does not contain a ship", () => {
    const gameBoard = new GameBoard();
    const isHit = gameBoard.markCellAsAttacked(0, 0);
    expect(isHit).toBe(false);
  });

  test("should handle a missed attack on the game board", () => {
    const gameBoard = new GameBoard();
    gameBoard.handleMissedAttack(0, 0);
    const cell = gameBoard.acsessCell(0, 0);
    expect(cell.isMissedAttack).toBe(true);
  });

  test("should handle a hit on a ship on the game board", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "Destroyer");
    gameBoard.placeShip(ship, 0, 0, "horizontal");
    gameBoard.handleHitOnShip(0, 0);
    expect(ship.hits).toBe(1);
  });

  test("should find a hit ship on the game board", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "Destroyer");
    gameBoard.placeShip(ship, 0, 0, "horizontal");
    const hitShip = gameBoard.findHitShip(0, 0);
    expect(hitShip).toBe(ship);
  });

  test("should check if the attack is valid on the game board", () => {
    const gameBoard = new GameBoard();
    const isValid = gameBoard.isValidAttack(0, 0);
    expect(isValid).toBe(true);
  });

  test("should check if the attack is invalid on the game board", () => {
    const gameBoard = new GameBoard();
    gameBoard.markCellAsAttacked(0, 0);
    const isValid = gameBoard.isValidAttack(0, 0);
    expect(isValid).toBe(false);
  });

});
