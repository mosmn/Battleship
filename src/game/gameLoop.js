import { ship } from "./ship";
import { player, ai } from "./player.js";
import {
  create10x10board,
  renderMessage,
  displayHumanShips,
  renderAIBoard,
  renderPlayerBoard,
  renderGameOver,
} from "../dom/dom.js";

export const gameLoop = (() => {
  let human = null;
  let computer = null;

  const createGameBoards = () => {
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
  };

  const startGame = () => {
    human = player();
    computer = ai();
    createGameBoards();
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
    renderMessage("");
    if (human.playerGameBoard.allShipsSunk()) {
      renderGameOver("Computer");
    } else {
      renderGameOver("You");
    }
    removeAttackListeners();
  };

  const handleClick = (e) => {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    if (computer.aiGameBoard.checkIfAttacked(x, y)) {
      return;
    }
    human.attackAI(x, y, computer.aiGameBoard);
    renderAIBoard(computer.aiGameBoard);
    removeAttackListeners();
    if (
      human.playerGameBoard.allShipsSunk() ||
      computer.aiGameBoard.allShipsSunk()
    ) {
      endGame();
    } else {
      computerTurn();
    }
  };

  const addAttackListeners = () => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");
    coordinates.forEach((coordinate) => {
      coordinate.addEventListener("click", handleClick);
    });
  };

  const removeAttackListeners = () => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");
    coordinates.forEach((coordinate) => {
      coordinate.removeEventListener("click", handleClick);
    });
  };

  return { startGame };
})();
