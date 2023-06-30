import "./style.css";
import { gameLoop } from "./gameLoop";

const createElement = (element, className, id) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.id = id;
  return newElement;
};

const create10x10board = (player) => {
  const board = createElement("div", "board", `${player}Board`);
  for (let i = 0; i < 10; i++) {
    const row = createElement("div", "row", `row${i}`);
    board.appendChild(row);
    for (let j = 0; j < 10; j++) {
      const cell = createElement("div", "cell", "");
      cell.setAttribute("data-x", j);
      cell.setAttribute("data-y", i);
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

const iniatialPage =  () => {
  document.body.appendChild(boardsContainer);
  boardsContainer.appendChild(create10x10board("human"));
  boardsContainer.appendChild(create10x10board("computer"));
};


document.addEventListener("DOMContentLoaded", iniatialPage);
