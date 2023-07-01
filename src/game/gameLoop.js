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
  let shipLength = 5;
  const direction = "horizontal";

  const createGameBoards = () => {
    human = player();
    computer = ai();
    create10x10board("player");
    create10x10board("ai");
    generateRandomPlacement();
    console.log(computer.aiGameBoard);
    displayHumanShips(human.playerGameBoard);

    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");

    playerCells.forEach((cell) => {
      cell.addEventListener("mouseover", handleCellHover);
      cell.addEventListener("click", handleCellClick);
    });
  };

  const startGame = () => {
    createGameBoards();
    renderMessage("Place your ships by hovering over the cells and clicking.");
  };

  const handleCellHover = (e) => {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    const coordinates = human.playerGameBoard.getShipPlacementCoordinates(
      shipLength,
      x,
      y,
      direction
    );

    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");

    playerCells.forEach((cell) => {
      const cellX = parseInt(cell.dataset.x, 10);
      const cellY = parseInt(cell.dataset.y, 10);

      if (coordinates.some((coord) => coord.x === cellX && coord.y === cellY)) {
        cell.classList.add("ship-placement");
      } else {
        cell.classList.remove("ship-placement");
      }
    });
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    if (!cell.classList.contains("ship-placement")) {
      return;
    }

    human.playerGameBoard.placeShip(ship(shipLength), x, y, direction);

    shipLength--;
    displayHumanShips(human.playerGameBoard);
    if (shipLength >= 2) {
      renderMessage(
        `Place your ${shipLength}-length ship by hovering over the cells and clicking.`
      );
    } else {
      renderMessage("");
      removeCellEventListeners();
      humanTurn();
    }
  };

  const generateRandomPlacement = () => {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach((length) => {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      computer.aiGameBoard.placeShip(ship(length), x, y, direction);
    });
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

  const removeCellEventListeners = () => {
    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");

    playerCells.forEach((cell) => {
      cell.removeEventListener("mouseover", handleCellHover);
      cell.removeEventListener("click", handleCellClick);
      cell.classList.remove("ship-placement");
    });
  };

  return { startGame };
})();
