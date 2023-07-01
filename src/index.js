import "../src/dom/dom.js";
import { gameLoop } from "./game/gameLoop.js";
import {
  createElement,
  renderBoards,
  renderMessage,
  renderGameOver,
} from "../src/dom/dom.js";

const iniatialPage = () => {
  const container = createElement("div", "container", "");
  const title = createElement("h1", "title", "");
  title.textContent = "Battleship";
  const startButton = createElement("button", "start-button", "");
  startButton.textContent = "Start Game";
  container.appendChild(title);
  container.appendChild(startButton);
  document.body.appendChild(container);
  const boardsContainer = createElement(
    "div",
    "boards-container",
    "boards-container"
  );
  document.body.appendChild(boardsContainer);

  startButton.addEventListener("click", () => {
    container.remove();
    gameLoop.startGame();
  });
};

document.addEventListener("DOMContentLoaded", iniatialPage);
