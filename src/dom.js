import "./style.css";
import {ship} from "./ship";
import { player, ai } from "./player.js";

const humanPlayer = player();
const computerPlayer = ai();

const createElement = (element, className, id) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.id = id;
  return newElement;
};

const create10x10board = () => {
  const board = createElement("div", "board", "board");
  for (let i = 0; i < 10; i++) {
    const row = createElement("div", "row", `row${i}`);
    board.appendChild(row);
    for (let j = 0; j < 10; j++) {
      const cell = createElement("div", "cell", `cell${i}${j}`);
      row.appendChild(cell);
    }
  }

  return board;
};

const boardsContainer = createElement(
  "div",
  "boards-container",
  "boards-container"
);

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(boardsContainer);
  boardsContainer.appendChild(create10x10board());
  boardsContainer.appendChild(create10x10board());
});
