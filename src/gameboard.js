export const gameBoard = () => {
  const board = [];
  const missedShots = [];

  const placeShip = (ship, x, y, direction) => {
    const coordinates = [];

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x: x + i, y });
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x, y: y + i });
      }
    }

    board.push({ ship, coordinates });
  };

  const receiveAttack = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const ship = board[i].ship;
      const coordinates = board[i].coordinates;
      for (let j = 0; j < coordinates.length; j++) {
        if (coordinates[j].x === x && coordinates[j].y === y) {
          ship.hit(j);
          return;
        }
      }
    }
    missedShots.push({ x, y });
  };

  const allShipsSunk = () => {
    for (let i = 0; i < board.length; i++) {
      if (!board[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  return { board, missedShots, placeShip, receiveAttack, allShipsSunk };
};

module.exports = gameBoard;
