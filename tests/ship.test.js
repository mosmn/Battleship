const ship = require('../src/ship.js');

test('ship factory function', () => {
    expect(ship(1, 1, 1)).toEqual({
        length: 1,
        hit: [false],
        sunk: false,
    });
    }
);
