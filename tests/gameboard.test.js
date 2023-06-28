const gameBoard = require("../src/gameboard");
const ship = require("../src/ship");

const testBoard = gameBoard();
const testShip = ship(3);

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