import Ship from "../Ship";

describe("#Ship", () => {
  let testBattleship;
  let testSubmarine;

  beforeEach(() => {
    testBattleship = new Ship(4);
    testSubmarine = new Ship(3);
  });

  test("creates a new ship", () => {
    expect(testBattleship).toEqual({ length: 4, hits: [] });
  });

  test("ship takes a hit", () => {
    testBattleship.hit(1);
    testSubmarine.hit(2);
    expect(testBattleship.hits).toContain(1);
    expect(testSubmarine.hits).toContain(2);
  });

  test("can't be hit in same spot more than once", () => {
    testBattleship.hit(1);
    testBattleship.hit(1);
    expect(testBattleship.hits.length).toBe(1);
  });

  test("is sunk/not sunk", () => {
    testSubmarine.hit(0);
    testSubmarine.hit(1);
    expect(testSubmarine.isSunk()).toBe(false);
    testSubmarine.hit(0);
    testSubmarine.hit(1);
    testSubmarine.hit(2);
    expect(testSubmarine.isSunk()).toBe(true);
  });
});
