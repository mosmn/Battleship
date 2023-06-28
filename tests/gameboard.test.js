const gameBoard = require("../src/gameboard");
const ship = require("../src/ship");

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
