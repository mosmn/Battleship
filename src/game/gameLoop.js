import { ship } from "./ship";
import { player, ai } from "./player.js";
import { create10x10board, renderMessage, removeMessage, displayHumanShips,
  renderAIBoard} from "../dom/dom.js";

export const gameLoop = (() => {
  let currentPlayer = null;
  let opponent = null;

  const startGame = () => {
    currentPlayer = player();
    opponent = ai();
    currentPlayer.playerGameBoard.placeShip(ship(5), 0, 0, "horizontal");
    currentPlayer.playerGameBoard.placeShip(ship(4), 0, 1, "horizontal");
    currentPlayer.playerGameBoard.placeShip(ship(3), 0, 2, "horizontal");
    currentPlayer.playerGameBoard.placeShip(ship(3), 0, 3, "horizontal");
    currentPlayer.playerGameBoard.placeShip(ship(2), 0, 4, "horizontal");
    opponent.aiGameBoard.placeShip(ship(5), 0, 0, "horizontal");
    opponent.aiGameBoard.placeShip(ship(4), 0, 1, "horizontal");
    opponent.aiGameBoard.placeShip(ship(3), 0, 2, "horizontal");
    opponent.aiGameBoard.placeShip(ship(3), 0, 3, "horizontal");
    opponent.aiGameBoard.placeShip(ship(2), 0, 4, "horizontal");
    console.log(opponent.aiGameBoard);
    create10x10board("player");
    create10x10board("ai");
    displayHumanShips(currentPlayer.playerGameBoard);
    playTurn();
  };

  const playTurn = () => {
    if (currentPlayer === currentPlayer) {
      renderMessage("Your turn! Select a coordinate to attack.");
      addAttackListeners(opponent.aiGameBoard);
    } else {
      renderMessage("Computer's turn...");
      setTimeout(() => {
        opponent.attack(currentPlayer.playerGameBoard);
        renderBoards(
          currentPlayer.playerGameBoard.board,
          opponent.aiGameBoard.board
        );
        if (
          currentPlayer.playerGameBoard.allShipsSunk() ||
          opponent.aiGameBoard.allShipsSunk()
        ) {
          endGame();
        } else {
          currentPlayer = opponent;
          opponent = currentPlayer;
          playTurn();
        }
      }, 1000);
    }
  };

  const endGame = () => {
    if (currentPlayer.playerGameBoard.allShipsSunk()) {
      renderMessage("Game Over! You lost!");
      renderGameOver();
    } else {
      renderMessage("Congratulations! You won!");
      renderGameOver();
    }
    removeAttackListeners(opponent.aiGameBoard);
  };

  const addAttackListeners = (gameBoard) => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");

    const handleAttack = (e) => {
      const x = parseInt(e.target.dataset.x, 10);
const y = parseInt(e.target.dataset.y, 10);

      if (gameBoard.checkIfAttacked(x, y)) {
        return;
      }
      currentPlayer.attackAI(x, y, gameBoard);
      renderAIBoard(gameBoard);
      console.log(gameBoard);
      if (
        currentPlayer.playerGameBoard.allShipsSunk() ||
        opponent.aiGameBoard.allShipsSunk()
      ) {
        endGame();
      } else {
        currentPlayer = opponent;
        opponent = currentPlayer;
        playTurn();
      }
    };

    coordinates.forEach((coordinate) => {
      coordinate.addEventListener("click", handleAttack);
    });
  };

  const removeAttackListeners = (gameBoard) => {
    const coordinates = document.querySelectorAll(".cell");
    coordinates.forEach((coordinate) => {
      coordinate.removeEventListener("click", handleAttack);
    });
  };

  return { startGame };
})();
