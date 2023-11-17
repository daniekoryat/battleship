import {describe, test, expect, beforeEach} from "vitest";
import Player from "../../factories/Player";
describe("Player class", () => {
  let player;

  beforeEach(() => {
    player = new Player(false);
    computer = new Player(true);
  });

  test("should create a Player object", () => {
    expect(player).toBeInstanceOf(Player);
  });

  test("should attack the opponent", () => {
    player.attackOpponent(0, 0, computer);
    expect(computer.board[0][0].isMarked).toBe(true);
  })

});
