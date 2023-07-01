import { ship } from "./ship";
import { player, ai } from "./player.js";
import {
  create10x10board,
  renderMessage,
  displayHumanShips,
  renderAIBoard,
  renderPlayerBoard,
} from "../dom/dom.js";

export const gameLoop = (() => {
  let human = null;
  let computer = null;

  const startGame = () => {
    human = player();
    computer = ai();
    human.playerGameBoard.placeShip(ship(5), 0, 0, "horizontal");
    human.playerGameBoard.placeShip(ship(4), 0, 1, "horizontal");
    human.playerGameBoard.placeShip(ship(3), 0, 2, "horizontal");
    human.playerGameBoard.placeShip(ship(3), 0, 3, "horizontal");
    human.playerGameBoard.placeShip(ship(2), 0, 4, "horizontal");
    computer.aiGameBoard.placeShip(ship(5), 0, 0, "horizontal");
    computer.aiGameBoard.placeShip(ship(4), 0, 1, "horizontal");
    computer.aiGameBoard.placeShip(ship(3), 0, 2, "horizontal");
    computer.aiGameBoard.placeShip(ship(3), 0, 3, "horizontal");
    computer.aiGameBoard.placeShip(ship(2), 0, 4, "horizontal");
    console.log(computer.aiGameBoard);
    create10x10board("player");
    create10x10board("ai");
    displayHumanShips(human.playerGameBoard);
    humanTurn();
  };

  const humanTurn = () => {
    renderMessage("Your turn! Select a coordinate to attack.");
    addAttackListeners(computer.aiGameBoard);
  };
  
  const computerTurn = () => {
    renderMessage("Computer's turn...");
    setTimeout(() => {
      computer.attack(human.playerGameBoard);
      renderPlayerBoard(human.playerGameBoard);
      if (
        human.playerGameBoard.allShipsSunk() ||
        computer.aiGameBoard.allShipsSunk()
      ) {
        endGame();
      } else {
        humanTurn();
      }
    }, 1000);
  };
  
  const endGame = () => {
    if (human.playerGameBoard.allShipsSunk()) {
      renderMessage("Game Over! You lost!");
      renderGameOver();
    } else {
      renderMessage("Congratulations! You won!");
      renderGameOver();
    }
    removeAttackListeners(computer.aiGameBoard);
  };

  const addAttackListeners = (gameBoard) => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");

    const handleAttack = (e) => {
      const x = parseInt(e.target.dataset.x, 10);
      const y = parseInt(e.target.dataset.y, 10);

      if (gameBoard.checkIfAttacked(x, y)) {
        return;
      }
      human.attackAI(x, y, gameBoard);
      renderAIBoard(gameBoard);
      if (
        human.playerGameBoard.allShipsSunk() ||
        computer.aiGameBoard.allShipsSunk()
      ) {
        endGame();
      } else {
        computerTurn();
      }
    };

    coordinates.forEach((coordinate) => {
      coordinate.addEventListener("click", handleAttack);
    });
  };

  const removeAttackListeners = (gameBoard) => {
    const coordinates = document.querySelectorAll(`#${gameBoard} .cell`);
    coordinates.forEach((coordinate) => {
      coordinate.removeEventListener("click", handleAttack);
    });
  };

  return { startGame };
})();
