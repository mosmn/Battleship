export const gameBoard = () => {
  const board = [];
  const missedShots = [];
  const alreadyAttacked = [];

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
          alreadyAttacked.push({ x, y });
          return;
        }
      }
    }
    missedShots.push({ x, y });
    alreadyAttacked.push({ x, y });
  };

  const allShipsSunk = () => {
    for (let i = 0; i < board.length; i++) {
      if (!board[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  const checkIfAttacked = (x, y) => {
    for (let i = 0; i < alreadyAttacked.length; i++) {
      if (alreadyAttacked[i].x === x && alreadyAttacked[i].y === y) {
        return true;
      }
    }
    return false;
  };

  const checkIfHit = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const coordinates = board[i].coordinates;
      for (let j = 0; j < coordinates.length; j++) {
        if (coordinates[j].x === x && coordinates[j].y === y) {
          return true;
        }
      }
    }
    return false;
  };

  return {
    board,
    missedShots,
    placeShip,
    receiveAttack,
    allShipsSunk,
    checkIfAttacked,
    checkIfHit
  };
};
