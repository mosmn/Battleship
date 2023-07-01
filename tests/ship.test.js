import { ship } from "../src/game/ship";

test("ship factory function", () => {
  expect(ship(3)).toEqual({
    length: 3,
    hitArray: [false, false, false],
    hit: expect.any(Function),
    isSunk: expect.any(Function),
  });
});

test("ship hit function", () => {
  const testShip = ship(3);
  testShip.hit(1);
  expect(testShip.hitArray).toMatchObject([false, true, false]);
});

test("ship isSunk function", () => {
  const testShip = ship(3);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});
