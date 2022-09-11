import Gameboard from "../Gameboard";
import Player from "../Player";
import Ship from "../Ship";

describe("#Player", () => {
  let testPlayer;
  let testGameboard;
  let testSubmarine;

  beforeEach(() => {
    testPlayer = new Player("player1");
    testGameboard = new Gameboard();
    testSubmarine = new Ship(3);
  });

  test("initializes a player object", () => {
    expect(testPlayer).toEqual({ name: "player1", attackCoords: [] });
  });

  test("attacks", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    testPlayer.attack(1, 1, testGameboard);
    testPlayer.attack(2, 1, testGameboard);
    testPlayer.attack(3, 1, testGameboard);
    expect(testGameboard.gameOver()).toBe(true);
  });

  test("random attacks", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    for (let i = 0; i < 100; i++) {
      testPlayer.randomAttack(testGameboard);
    }
    expect(testGameboard.gameOver()).toBe(true);
  });
});
