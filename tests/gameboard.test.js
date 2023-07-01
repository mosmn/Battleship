import { gameBoard } from "../src/game/gameboard";
import { ship } from "../src/game/ship";

let testShip;
let testBoard;

beforeAll(() => {
  testShip = ship(3);
  testBoard = gameBoard();
});

test("gameBoard returns a object", () => {
  expect(typeof testBoard).toBe("object");
});

test("placeShip places a ship on the gameBoard", () => {
  testBoard.placeShip(testShip, 0, 0, "horizontal");
  expect(testBoard.board).toMatchObject([
    {
      ship: testShip,
      coordinates: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
    },
  ]);
});

test("receiveAttack records a missed shot", () => {
  testBoard.receiveAttack(0, 1);
  expect(testBoard.missedShots).toMatchObject([{ x: 0, y: 1 }]);
});

test("receiveAttack records a hit on a ship", () => {
  testBoard.receiveAttack(0, 0);
  expect(testShip.hitArray).toMatchObject([true, false, false]);
});

test("allShipsSunk returns true if all ships are sunk", () => {
  expect(testBoard.allShipsSunk()).toBe(false);
  testBoard.receiveAttack(1, 0);
  testBoard.receiveAttack(2, 0);
  expect(testBoard.allShipsSunk()).toBe(true);

  const extraTestShip = ship(2);
  testBoard.placeShip(extraTestShip, 0, 1, "vertical");
  testBoard.receiveAttack(0, 1);
  testBoard.receiveAttack(0, 2);
  expect(testBoard.allShipsSunk()).toBe(true);
});

test("Check if a coordinate has already been attacked", () => {
  expect(testBoard.checkIfAttacked(0, 0)).toBe(true);
  expect(testBoard.checkIfAttacked(5, 5)).toBe(false);
});
