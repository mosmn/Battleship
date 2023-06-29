import gameBoard from "./gameBoard.js";

export const player = () => {
  const playerGameBoard = gameBoard();

  const attackAI = (x, y, oppsGameBoard) => {
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      return;
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };

  return { playerGameBoard, attackAI };
};

export const ai = () => {
  const aiGameBoard = gameBoard();

  const attack = (oppsGameBoard) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      attack(oppsGameBoard);
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };

  return { aiGameBoard, attack };
};

module.exports = { player, ai };
