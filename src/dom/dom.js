import "./style.css";

export const createElement = (element, className, id) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.id = id;
  return newElement;
};

export const create10x10board = (player) => {
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
  const boardsContainer = document.getElementById("boards-container");
  boardsContainer.appendChild(board);
};

export const renderMessage = (message) => {
  const messageContainer = createElement("div", "message-container", "");
  const messageElement = createElement("p", "message", "");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  document.body.appendChild(messageContainer);
};
