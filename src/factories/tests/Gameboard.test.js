import Gameboard from "../Gameboard";
import Ship from "../Ship";

describe("#Gameboard", () => {
  let testGameboard;
  let testSubmarine;
  let testCruiser;
  let testBoardArray;
  let testMissedShotsArray;

  beforeEach(() => {
    testGameboard = new Gameboard();
    testSubmarine = new Ship(3);
    testCruiser = new Ship(3);
    testBoardArray = [];
    testMissedShotsArray = [];

    for (let i = 0; i < 10; i++) {
      testBoardArray[i] = [];
      testMissedShotsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        testBoardArray[i][j] = null;
        testMissedShotsArray[i][j] = false;
      }
    }
  });

  test("creates gameboard with proper amount of cells", () => {
    expect(testGameboard).toEqual({
      board: testBoardArray,
      missedShots: testMissedShotsArray,
    });
  });

  test("places a ship", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    testBoardArray[1][1] = testSubmarine;
    testBoardArray[2][1] = testSubmarine;
    testBoardArray[3][1] = testSubmarine;
    expect(testGameboard).toEqual({
      board: testBoardArray,
      missedShots: testMissedShotsArray,
    });
  });

  test("prevents ship placement outside of gameboard", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    expect(testGameboard.isPlacementValid(testSubmarine, 8, 8, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 10, 10, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 4, 5, true)).toBe(
      true
    );
  });

  test("prevents ship placement on an occupied area", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    expect(testGameboard.isPlacementValid(testSubmarine, 1, 1, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 2, 1, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 3, 1, true)).toBe(
      false
    );
  });

  test("prevents ship placement directly adjacent another ship", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    expect(testGameboard.isPlacementValid(testSubmarine, 0, 0, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 4, 2, true)).toBe(
      false
    );
    expect(testGameboard.isPlacementValid(testSubmarine, 5, 2, true)).toBe(
      true
    );
  });

  test("randomly places all ships", () => {
    expect(testGameboard.getEmptyFieldsAmount()).toBe(100);
    testGameboard.placeShipsRandomly();
    expect(testGameboard.getEmptyFieldsAmount()).toBe(83);
  });

  test("receives attacks", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    testGameboard.receiveAttack(3, 1);
    expect(testGameboard.board[3][1].hits.includes(2)).toBe(true);
  });

  test("accounts for missed shots", () => {
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    testGameboard.receiveAttack(1, 4);
    expect(testGameboard.missedShots[1][4]).toBe(true);
    testGameboard.receiveAttack(2, 6);
    expect(testGameboard.missedShots[(1, 2)][(4, 6)]).toBe(true);
    testGameboard.receiveAttack(1, 7);
    expect(testGameboard.missedShots[(1, 2, 1)][(4, 6, 7)]).toBe(true);
  });

  test("says when game is over", () => {
    expect(testGameboard.gameOver()).toBe(false);
    testGameboard.placeShip(testSubmarine, 1, 1, true);
    expect(testGameboard.gameOver()).toBe(false);
    testGameboard.receiveAttack(1, 1);
    testGameboard.receiveAttack(2, 1);
    testGameboard.receiveAttack(3, 1);
    expect(testGameboard.gameOver()).toBe(true);
    testGameboard.placeShip(testCruiser, 5, 5, false);
    expect(testGameboard.gameOver()).toBe(false);
    testGameboard.receiveAttack(5, 5);
    testGameboard.receiveAttack(5, 6);
    testGameboard.receiveAttack(5, 7);
    expect(testGameboard.gameOver()).toBe(true);
  });
});
