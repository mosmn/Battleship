import "./style.css";

const createElement = (element, className, id) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.id = id;
  return newElement;
}

const createBoard = (board, boardId, boardClass) => {
  const newBoard = createElement("div", boardClass, boardId);
  for (let i = 0; i < board.length; i++) {
    const newSquare = createElement("div", "square", `square${i}`);
    newBoard.appendChild(newSquare);
  }
  return newBoard;
}
