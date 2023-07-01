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

const removeMessage = () => {
  const messageContainer = document.querySelector(".message-container");
  messageContainer.remove();
}

export const renderMessage = (message) => {
  if (document.querySelector(".message-container")) {
    removeMessage();
  }
  const messageContainer = createElement("div", "message-container", "");
  const messageElement = createElement("p", "message", "");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  document.body.appendChild(messageContainer);
};

export const displayHumanShips = (playerGameBoard) => {
  const humanBoard = document.getElementById("playerBoard");
  for (let i = 0; i < playerGameBoard.board.length; i++) {
    const coordinates = playerGameBoard.board[i].coordinates;
    for (let j = 0; j < coordinates.length; j++) {
      const x = coordinates[j].x;
      const y = coordinates[j].y;
      const cell = humanBoard.querySelector(
        `[data-x="${x}"][data-y="${y}"]`
      );
      cell.classList.add("ship");
    }
  }
}

const renderBoard = (gameBoard, boardId) => {
  const board = document.getElementById(boardId);
  const missedShots = gameBoard.missedShots;
  const boardSize = board.children.length;

  for (let i = 0; i < missedShots.length; i++) {
    const { x, y } = missedShots[i];
    const cell = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    cell.classList.add("missed");
  }

  for (let i = 0; i < boardSize; i++) {
    const row = board.children[i].children;

    for (let j = 0; j < boardSize; j++) {
      const cell = row[j];
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);

      if (gameBoard.checkIfAttacked(x, y) && gameBoard.checkIfHit(x, y)) {
        cell.classList.add("hit");
      }
    }
  }
};

export const renderAIBoard = (gameBoard) => {
  renderBoard(gameBoard, "aiBoard");
};

export const renderPlayerBoard = (gameBoard) => {
  renderBoard(gameBoard, "playerBoard");
};






