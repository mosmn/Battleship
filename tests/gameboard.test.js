const gameBoard = require('../src/gameboard');

test('gameBoard returns a gameBoard object', () => {
    expect(gameBoard()).toMatchObject({board: [], missedShots: [], placeShip: expect.any(Function)});
}
);

test('gameBoard.placeShip() places a ship on the gameBoard', () => {
    const testBoard = gameBoard();
    const testShip = {length: 3};
    testBoard.placeShip(testShip, 0, 0, 'horizontal');
    expect(testBoard.board).toMatchObject([{ship: testShip, coordinates: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]}]);
}
);

