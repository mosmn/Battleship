import {ship} from './ship.js';

export const gameBoard = () => {
    const board = [];
    const missedShots = [];

    const placeShip = (ship, x, y, direction) => {
        const coordinates = [];

        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({x: x + i, y});
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                coordinates.push({x, y: y + i});
            }
        }

        board.push({ship, coordinates});
    };

    return {board, missedShots, placeShip};
}

module.exports = gameBoard;