"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["index"],{

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create10x10board: () => (/* binding */ create10x10board),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   displayHumanShips: () => (/* binding */ displayHumanShips),
/* harmony export */   renderAIBoard: () => (/* binding */ renderAIBoard),
/* harmony export */   renderGameOver: () => (/* binding */ renderGameOver),
/* harmony export */   renderMessage: () => (/* binding */ renderMessage),
/* harmony export */   renderPlayerBoard: () => (/* binding */ renderPlayerBoard)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/dom/style.css");

const createElement = (element, className, id) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.id = id;
  return newElement;
};
const create10x10board = player => {
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
};
const renderMessage = message => {
  if (document.querySelector(".message-container")) {
    removeMessage();
  }
  const messageContainer = createElement("div", "message-container", "");
  const messageElement = createElement("p", "message", "");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  document.body.appendChild(messageContainer);
};
const displayHumanShips = playerGameBoard => {
  const humanBoard = document.getElementById("playerBoard");
  for (let i = 0; i < playerGameBoard.board.length; i++) {
    const coordinates = playerGameBoard.board[i].coordinates;
    for (let j = 0; j < coordinates.length; j++) {
      const x = coordinates[j].x;
      const y = coordinates[j].y;
      const cell = humanBoard.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      cell.classList.add("ship");
    }
  }
};
const renderBoard = (gameBoard, boardId) => {
  const board = document.getElementById(boardId);
  const missedShots = gameBoard.missedShots;
  const boardSize = board.children.length;
  for (let i = 0; i < missedShots.length; i++) {
    const {
      x,
      y
    } = missedShots[i];
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
const renderAIBoard = gameBoard => {
  renderBoard(gameBoard, "aiBoard");
};
const renderPlayerBoard = gameBoard => {
  renderBoard(gameBoard, "playerBoard");
};
const playAgain = () => {
  const playAgainButton = createElement("button", "play-again-button", "");
  playAgainButton.textContent = "Play Again";
  playAgainButton.addEventListener("click", () => {
    location.reload();
  });
  const gameOverContainer = document.querySelector(".game-over-container");
  gameOverContainer.appendChild(playAgainButton);
};
const renderGameOver = winner => {
  const gameOverContainer = createElement("div", "game-over-container", "");
  const gameOverGift = createElement("img", "game-over-gift", "");
  const gameOverMessage = createElement("p", "game-over-message", "");
  const boardsContainer = document.getElementById("boards-container");
  if (winner === "You") {
    gameOverGift.src = "https://media0.giphy.com/media/SABpzb2ivrS0g4Hgbb/giphy.gif";
    gameOverMessage.textContent = "You won!";
  } else {
    gameOverGift.src = "https://i.gifer.com/5FGG.gif";
    gameOverMessage.textContent = "You lost!";
  }
  gameOverContainer.appendChild(gameOverGift);
  gameOverContainer.appendChild(gameOverMessage);
  document.body.insertBefore(gameOverContainer, boardsContainer);
  playAgain();
};

/***/ }),

/***/ "./src/game/gameLoop.js":
/*!******************************!*\
  !*** ./src/game/gameLoop.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameLoop: () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/game/ship.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/game/player.js");
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");



const gameLoop = (() => {
  let human = null;
  let computer = null;
  let shipLength = 5;
  const direction = "horizontal";
  const createGameBoards = () => {
    human = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.player)();
    computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.ai)();
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("player");
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("ai");
    generateRandomPlacement();
    console.log(computer.aiGameBoard);
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayHumanShips)(human.playerGameBoard);
    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");
    playerCells.forEach(cell => {
      cell.addEventListener("mouseover", handleCellHover);
      cell.addEventListener("click", handleCellClick);
    });
  };
  const startGame = () => {
    createGameBoards();
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Place your ships by hovering over the cells and clicking.");
  };
  const handleCellHover = e => {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    const coordinates = human.playerGameBoard.getShipPlacementCoordinates(shipLength, x, y, direction);
    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");
    playerCells.forEach(cell => {
      const cellX = parseInt(cell.dataset.x, 10);
      const cellY = parseInt(cell.dataset.y, 10);
      if (coordinates.some(coord => coord.x === cellX && coord.y === cellY)) {
        cell.classList.add("ship-placement");
      } else {
        cell.classList.remove("ship-placement");
      }
    });
  };
  const handleCellClick = e => {
    const cell = e.target;
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    if (!cell.classList.contains("ship-placement")) {
      return;
    }
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(shipLength), x, y, direction);
    shipLength--;
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayHumanShips)(human.playerGameBoard);
    if (shipLength >= 2) {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)(`Place your ${shipLength}-length ship by hovering over the cells and clicking.`);
    } else {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("");
      removeCellEventListeners();
      humanTurn();
    }
  };
  const generateRandomPlacement = () => {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach(length => {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(length), x, y, direction);
    });
  };
  const humanTurn = () => {
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Your turn! Select a coordinate to attack.");
    addAttackListeners(computer.aiGameBoard);
  };
  const computerTurn = () => {
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Computer's turn...");
    setTimeout(() => {
      computer.attack(human.playerGameBoard);
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderPlayerBoard)(human.playerGameBoard);
      if (human.playerGameBoard.allShipsSunk() || computer.aiGameBoard.allShipsSunk()) {
        endGame();
      } else {
        humanTurn();
      }
    }, 1000);
  };
  const endGame = () => {
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("");
    if (human.playerGameBoard.allShipsSunk()) {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderGameOver)("Computer");
    } else {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderGameOver)("You");
    }
    removeAttackListeners();
  };
  const handleClick = e => {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (computer.aiGameBoard.checkIfAttacked(x, y)) {
      return;
    }
    human.attackAI(x, y, computer.aiGameBoard);
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderAIBoard)(computer.aiGameBoard);
    removeAttackListeners();
    if (human.playerGameBoard.allShipsSunk() || computer.aiGameBoard.allShipsSunk()) {
      endGame();
    } else {
      computerTurn();
    }
  };
  const addAttackListeners = () => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");
    coordinates.forEach(coordinate => {
      coordinate.addEventListener("click", handleClick);
    });
  };
  const removeAttackListeners = () => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");
    coordinates.forEach(coordinate => {
      coordinate.removeEventListener("click", handleClick);
    });
  };
  const removeCellEventListeners = () => {
    const playerBoard = document.getElementById("playerBoard");
    const playerCells = playerBoard.querySelectorAll(".cell");
    playerCells.forEach(cell => {
      cell.removeEventListener("mouseover", handleCellHover);
      cell.removeEventListener("click", handleCellClick);
      cell.classList.remove("ship-placement");
    });
  };
  return {
    startGame
  };
})();

/***/ }),

/***/ "./src/game/gameboard.js":
/*!*******************************!*\
  !*** ./src/game/gameboard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoard: () => (/* binding */ gameBoard)
/* harmony export */ });
const gameBoard = () => {
  const board = [];
  const missedShots = [];
  const alreadyAttacked = [];
  const placeShip = (ship, x, y, direction) => {
    const coordinates = [];
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({
          x: x + i,
          y
        });
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({
          x,
          y: y + i
        });
      }
    }
    board.push({
      ship,
      coordinates
    });
  };
  const receiveAttack = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const ship = board[i].ship;
      const coordinates = board[i].coordinates;
      for (let j = 0; j < coordinates.length; j++) {
        if (coordinates[j].x === x && coordinates[j].y === y) {
          ship.hit(j);
          alreadyAttacked.push({
            x,
            y
          });
          return;
        }
      }
    }
    missedShots.push({
      x,
      y
    });
    alreadyAttacked.push({
      x,
      y
    });
  };
  const allShipsSunk = () => {
    for (let i = 0; i < board.length; i++) {
      if (!board[i].ship.isSunk()) {
        return false;
      }
    }
    return true;
  };
  const checkIfAttacked = (x, y) => {
    for (let i = 0; i < alreadyAttacked.length; i++) {
      if (alreadyAttacked[i].x === x && alreadyAttacked[i].y === y) {
        return true;
      }
    }
    return false;
  };
  const checkIfHit = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const coordinates = board[i].coordinates;
      for (let j = 0; j < coordinates.length; j++) {
        if (coordinates[j].x === x && coordinates[j].y === y) {
          return true;
        }
      }
    }
    return false;
  };
  const getShipPlacementCoordinates = (length, x, y, direction) => {
    const coordinates = [];
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        coordinates.push({
          x: x + i,
          y
        });
      }
    } else {
      for (let i = 0; i < length; i++) {
        coordinates.push({
          x,
          y: y + i
        });
      }
    }
    return coordinates;
  };
  return {
    board,
    missedShots,
    placeShip,
    receiveAttack,
    allShipsSunk,
    checkIfAttacked,
    checkIfHit,
    getShipPlacementCoordinates
  };
};

/***/ }),

/***/ "./src/game/player.js":
/*!****************************!*\
  !*** ./src/game/player.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ai: () => (/* binding */ ai),
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/game/gameboard.js");

const player = () => {
  const playerGameBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const attackAI = (x, y, oppsGameBoard) => {
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      return;
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };
  return {
    playerGameBoard,
    attackAI
  };
};
const ai = () => {
  const aiGameBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const attack = oppsGameBoard => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      attack(oppsGameBoard);
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };
  return {
    aiGameBoard,
    attack
  };
};

/***/ }),

/***/ "./src/game/ship.js":
/*!**************************!*\
  !*** ./src/game/ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ship: () => (/* binding */ ship)
/* harmony export */ });
const ship = length => {
  const hitArray = new Array(length).fill(false);
  const hit = position => {
    hitArray[position] = true;
  };
  const isSunk = () => hitArray.every(position => position === true);
  return {
    length,
    hitArray,
    hit,
    isSunk
  };
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/dom/dom.js */ "./src/dom/dom.js");
/* harmony import */ var _game_gameLoop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/gameLoop.js */ "./src/game/gameLoop.js");



const iniatialPage = () => {
  const container = (0,_src_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", "container", "");
  const title = (0,_src_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", "title", "");
  title.textContent = "Battleship";
  const startButton = (0,_src_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", "start-button", "");
  startButton.textContent = "Start Game";
  container.appendChild(title);
  container.appendChild(startButton);
  document.body.appendChild(container);
  const boardsContainer = (0,_src_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", "boards-container", "boards-container");
  document.body.appendChild(boardsContainer);
  startButton.addEventListener("click", () => {
    container.remove();
    _game_gameLoop_js__WEBPACK_IMPORTED_MODULE_1__.gameLoop.startGame();
  });
};
document.addEventListener("DOMContentLoaded", iniatialPage);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/dom/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/dom/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  scroll-behavior: smooth;
  height: 100%;
}

body {
  line-height: 1.6em;
  margin: 0;
  padding: 0px;
  height: 100vh;
}

.board {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  background-color: #eee;
  border: 1px solid #ccc;
  width: 410px;
  height: 410px;
}

.row {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.cell {
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}

#aiBoard .cell:hover {
  cursor: pointer;
  background-color: #ddd;
}

.boards-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}

.ship {
  background-color: #000;
}

.missed {
  background-image: url("https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.hit {
  background-image: url("https://img.icons8.com/emoji/48/000000/fire.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.ship-placement {
  background-color: #000;
}

.message-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #ddd;
  text-align: center;
}

.game-over-container {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.game-over-gift {
  width: 200px;
  height: auto;
}

.play-again-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.play-again-button:hover {
  background-color: #45a049;
}

.orientation-button {
  margin-left: 10px;
}

.random-placement-button {
  margin-left: 10px;
}
`, "",{"version":3,"sources":["webpack://./src/dom/style.css"],"names":[],"mappings":"AAAA;AACA;;AAEA;EACE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,sBAAsB;EACtB,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,oFAAoF;EACpF,wBAAwB;EACxB,4BAA4B;EAC5B,2BAA2B;AAC7B;;AAEA;EACE,wEAAwE;EACxE,wBAAwB;EACxB,4BAA4B;EAC5B,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB","sourcesContent":[":root {\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\nhtml {\n  box-sizing: border-box;\n  scroll-behavior: smooth;\n  height: 100%;\n}\n\nbody {\n  line-height: 1.6em;\n  margin: 0;\n  padding: 0px;\n  height: 100vh;\n}\n\n.board {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  background-color: #eee;\n  border: 1px solid #ccc;\n  width: 410px;\n  height: 410px;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.cell {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  width: 100%;\n  height: 100%;\n}\n\n#aiBoard .cell:hover {\n  cursor: pointer;\n  background-color: #ddd;\n}\n\n.boards-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 2rem;\n}\n\n.ship {\n  background-color: #000;\n}\n\n.missed {\n  background-image: url(\"https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.hit {\n  background-image: url(\"https://img.icons8.com/emoji/48/000000/fire.png\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.ship-placement {\n  background-color: #000;\n}\n\n.message-container {\n  margin-top: 20px;\n  padding: 10px;\n  background-color: #ddd;\n  text-align: center;\n}\n\n.game-over-container {\n  margin-top: 20px;\n  padding: 10px;\n  text-align: center;\n}\n\n.game-over-gift {\n  width: 200px;\n  height: auto;\n}\n\n.play-again-button {\n  margin-top: 10px;\n  padding: 10px 20px;\n  font-size: 16px;\n  background-color: #4caf50;\n  color: white;\n  border: none;\n  cursor: pointer;\n}\n\n.play-again-button:hover {\n  background-color: #45a049;\n}\n\n.orientation-button {\n  margin-left: 10px;\n}\n\n.random-placement-button {\n  margin-left: 10px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/dom/style.css":
/*!***************************!*\
  !*** ./src/dom/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/dom/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9zdHlsZS5jc3M/YmI1ZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNsYXNzTmFtZSwgaWQpID0+IHtcbiAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gIG5ld0VsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICBuZXdFbGVtZW50LmlkID0gaWQ7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZTEweDEwYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImJvYXJkXCIsIGAke3BsYXllcn1Cb2FyZGApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwicm93XCIsIGByb3cke2l9YCk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2VsbFwiLCBcIlwiKTtcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGopO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgaSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRzLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbn07XG5cbmNvbnN0IHJlbW92ZU1lc3NhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2UtY29udGFpbmVyXCIpO1xuICBtZXNzYWdlQ29udGFpbmVyLnJlbW92ZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlck1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLWNvbnRhaW5lclwiKSkge1xuICAgIHJlbW92ZU1lc3NhZ2UoKTtcbiAgfVxuICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm1lc3NhZ2UtY29udGFpbmVyXCIsIFwiXCIpO1xuICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJwXCIsIFwibWVzc2FnZVwiLCBcIlwiKTtcbiAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICBtZXNzYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGFpbmVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5SHVtYW5TaGlwcyA9IChwbGF5ZXJHYW1lQm9hcmQpID0+IHtcbiAgY29uc3QgaHVtYW5Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyR2FtZUJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBwbGF5ZXJHYW1lQm9hcmQuYm9hcmRbaV0uY29vcmRpbmF0ZXM7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgeCA9IGNvb3JkaW5hdGVzW2pdLng7XG4gICAgICBjb25zdCB5ID0gY29vcmRpbmF0ZXNbal0ueTtcbiAgICAgIGNvbnN0IGNlbGwgPSBodW1hbkJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCByZW5kZXJCb2FyZCA9IChnYW1lQm9hcmQsIGJvYXJkSWQpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZElkKTtcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBnYW1lQm9hcmQubWlzc2VkU2hvdHM7XG4gIGNvbnN0IGJvYXJkU2l6ZSA9IGJvYXJkLmNoaWxkcmVuLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG1pc3NlZFNob3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBtaXNzZWRTaG90c1tpXTtcbiAgICBjb25zdCBjZWxsID0gYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTaXplOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBib2FyZC5jaGlsZHJlbltpXS5jaGlsZHJlbjtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTaXplOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSByb3dbal07XG4gICAgICBjb25zdCB4ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LngpO1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC55KTtcblxuICAgICAgaWYgKGdhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkgJiYgZ2FtZUJvYXJkLmNoZWNrSWZIaXQoeCwgeSkpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckFJQm9hcmQgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gIHJlbmRlckJvYXJkKGdhbWVCb2FyZCwgXCJhaUJvYXJkXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclBsYXllckJvYXJkID0gKGdhbWVCb2FyZCkgPT4ge1xuICByZW5kZXJCb2FyZChnYW1lQm9hcmQsIFwicGxheWVyQm9hcmRcIik7XG59O1xuXG5jb25zdCBwbGF5QWdhaW4gPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXlBZ2FpbkJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJwbGF5LWFnYWluLWJ1dHRvblwiLCBcIlwiKTtcbiAgcGxheUFnYWluQnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluXCI7XG4gIHBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbiAgY29uc3QgZ2FtZU92ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1jb250YWluZXJcIik7XG4gIGdhbWVPdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlBZ2FpbkJ1dHRvbik7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR2FtZU92ZXIgPSAod2lubmVyKSA9PiB7XG4gIGNvbnN0IGdhbWVPdmVyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImdhbWUtb3Zlci1jb250YWluZXJcIiwgXCJcIik7XG4gIGNvbnN0IGdhbWVPdmVyR2lmdCA9IGNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgXCJnYW1lLW92ZXItZ2lmdFwiLCBcIlwiKTtcbiAgY29uc3QgZ2FtZU92ZXJNZXNzYWdlID0gY3JlYXRlRWxlbWVudChcInBcIiwgXCJnYW1lLW92ZXItbWVzc2FnZVwiLCBcIlwiKTtcbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZHMtY29udGFpbmVyXCIpO1xuICBpZiAod2lubmVyID09PSBcIllvdVwiKSB7XG4gICAgZ2FtZU92ZXJHaWZ0LnNyYyA9XG4gICAgICBcImh0dHBzOi8vbWVkaWEwLmdpcGh5LmNvbS9tZWRpYS9TQUJwemIyaXZyUzBnNEhnYmIvZ2lwaHkuZ2lmXCI7XG4gICAgZ2FtZU92ZXJNZXNzYWdlLnRleHRDb250ZW50ID0gXCJZb3Ugd29uIVwiO1xuICB9IGVsc2Uge1xuICAgIGdhbWVPdmVyR2lmdC5zcmMgPSBcImh0dHBzOi8vaS5naWZlci5jb20vNUZHRy5naWZcIjtcbiAgICBnYW1lT3Zlck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIllvdSBsb3N0IVwiO1xuICB9XG4gIGdhbWVPdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVPdmVyR2lmdCk7XG4gIGdhbWVPdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVPdmVyTWVzc2FnZSk7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGdhbWVPdmVyQ29udGFpbmVyLCBib2FyZHNDb250YWluZXIpO1xuICBwbGF5QWdhaW4oKTtcbn07XG4iLCJpbXBvcnQgeyBzaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgcGxheWVyLCBhaSB9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlMTB4MTBib2FyZCxcbiAgcmVuZGVyTWVzc2FnZSxcbiAgZGlzcGxheUh1bWFuU2hpcHMsXG4gIHJlbmRlckFJQm9hcmQsXG4gIHJlbmRlclBsYXllckJvYXJkLFxuICByZW5kZXJHYW1lT3Zlcixcbn0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVMb29wID0gKCgpID0+IHtcbiAgbGV0IGh1bWFuID0gbnVsbDtcbiAgbGV0IGNvbXB1dGVyID0gbnVsbDtcbiAgbGV0IHNoaXBMZW5ndGggPSA1O1xuICBjb25zdCBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcblxuICBjb25zdCBjcmVhdGVHYW1lQm9hcmRzID0gKCkgPT4ge1xuICAgIGh1bWFuID0gcGxheWVyKCk7XG4gICAgY29tcHV0ZXIgPSBhaSgpO1xuICAgIGNyZWF0ZTEweDEwYm9hcmQoXCJwbGF5ZXJcIik7XG4gICAgY3JlYXRlMTB4MTBib2FyZChcImFpXCIpO1xuICAgIGdlbmVyYXRlUmFuZG9tUGxhY2VtZW50KCk7XG4gICAgY29uc29sZS5sb2coY29tcHV0ZXIuYWlHYW1lQm9hcmQpO1xuICAgIGRpc3BsYXlIdW1hblNoaXBzKGh1bWFuLnBsYXllckdhbWVCb2FyZCk7XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XG4gICAgY29uc3QgcGxheWVyQ2VsbHMgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG5cbiAgICBwbGF5ZXJDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlQ2VsbEhvdmVyKTtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNlbGxDbGljayk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGNyZWF0ZUdhbWVCb2FyZHMoKTtcbiAgICByZW5kZXJNZXNzYWdlKFwiUGxhY2UgeW91ciBzaGlwcyBieSBob3ZlcmluZyBvdmVyIHRoZSBjZWxscyBhbmQgY2xpY2tpbmcuXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNlbGxIb3ZlciA9IChlKSA9PiB7XG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnksIDEwKTtcblxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gaHVtYW4ucGxheWVyR2FtZUJvYXJkLmdldFNoaXBQbGFjZW1lbnRDb29yZGluYXRlcyhcbiAgICAgIHNoaXBMZW5ndGgsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGRpcmVjdGlvblxuICAgICk7XG5cbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XG4gICAgY29uc3QgcGxheWVyQ2VsbHMgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG5cbiAgICBwbGF5ZXJDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjb25zdCBjZWxsWCA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC54LCAxMCk7XG4gICAgICBjb25zdCBjZWxsWSA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC55LCAxMCk7XG5cbiAgICAgIGlmIChjb29yZGluYXRlcy5zb21lKChjb29yZCkgPT4gY29vcmQueCA9PT0gY2VsbFggJiYgY29vcmQueSA9PT0gY2VsbFkpKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXAtcGxhY2VtZW50XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcC1wbGFjZW1lbnRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2VsbENsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC54LCAxMCk7XG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC55LCAxMCk7XG5cbiAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcC1wbGFjZW1lbnRcIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBodW1hbi5wbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoc2hpcExlbmd0aCksIHgsIHksIGRpcmVjdGlvbik7XG5cbiAgICBzaGlwTGVuZ3RoLS07XG4gICAgZGlzcGxheUh1bWFuU2hpcHMoaHVtYW4ucGxheWVyR2FtZUJvYXJkKTtcbiAgICBpZiAoc2hpcExlbmd0aCA+PSAyKSB7XG4gICAgICByZW5kZXJNZXNzYWdlKFxuICAgICAgICBgUGxhY2UgeW91ciAke3NoaXBMZW5ndGh9LWxlbmd0aCBzaGlwIGJ5IGhvdmVyaW5nIG92ZXIgdGhlIGNlbGxzIGFuZCBjbGlja2luZy5gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJNZXNzYWdlKFwiXCIpO1xuICAgICAgcmVtb3ZlQ2VsbEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBodW1hblR1cm4oKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVSYW5kb21QbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgc2hpcExlbmd0aHMuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgICAgIGNvbXB1dGVyLmFpR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKGxlbmd0aCksIHgsIHksIGRpcmVjdGlvbik7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaHVtYW5UdXJuID0gKCkgPT4ge1xuICAgIHJlbmRlck1lc3NhZ2UoXCJZb3VyIHR1cm4hIFNlbGVjdCBhIGNvb3JkaW5hdGUgdG8gYXR0YWNrLlwiKTtcbiAgICBhZGRBdHRhY2tMaXN0ZW5lcnMoY29tcHV0ZXIuYWlHYW1lQm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcbiAgICByZW5kZXJNZXNzYWdlKFwiQ29tcHV0ZXIncyB0dXJuLi4uXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcHV0ZXIuYXR0YWNrKGh1bWFuLnBsYXllckdhbWVCb2FyZCk7XG4gICAgICByZW5kZXJQbGF5ZXJCb2FyZChodW1hbi5wbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgaWYgKFxuICAgICAgICBodW1hbi5wbGF5ZXJHYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkgfHxcbiAgICAgICAgY29tcHV0ZXIuYWlHYW1lQm9hcmQuYWxsU2hpcHNTdW5rKClcbiAgICAgICkge1xuICAgICAgICBlbmRHYW1lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBodW1hblR1cm4oKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBjb25zdCBlbmRHYW1lID0gKCkgPT4ge1xuICAgIHJlbmRlck1lc3NhZ2UoXCJcIik7XG4gICAgaWYgKGh1bWFuLnBsYXllckdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgcmVuZGVyR2FtZU92ZXIoXCJDb21wdXRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVuZGVyR2FtZU92ZXIoXCJZb3VcIik7XG4gICAgfVxuICAgIHJlbW92ZUF0dGFja0xpc3RlbmVycygpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuXG4gICAgaWYgKGNvbXB1dGVyLmFpR2FtZUJvYXJkLmNoZWNrSWZBdHRhY2tlZCh4LCB5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBodW1hbi5hdHRhY2tBSSh4LCB5LCBjb21wdXRlci5haUdhbWVCb2FyZCk7XG4gICAgcmVuZGVyQUlCb2FyZChjb21wdXRlci5haUdhbWVCb2FyZCk7XG4gICAgcmVtb3ZlQXR0YWNrTGlzdGVuZXJzKCk7XG4gICAgaWYgKFxuICAgICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpIHx8XG4gICAgICBjb21wdXRlci5haUdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKVxuICAgICkge1xuICAgICAgZW5kR2FtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wdXRlclR1cm4oKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkQXR0YWNrTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNhaUJvYXJkIC5jZWxsXCIpO1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVBdHRhY2tMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2FpQm9hcmQgLmNlbGxcIik7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29vcmRpbmF0ZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUNlbGxFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XG4gICAgY29uc3QgcGxheWVyQ2VsbHMgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG5cbiAgICBwbGF5ZXJDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlQ2VsbEhvdmVyKTtcbiAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNlbGxDbGljayk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLXBsYWNlbWVudFwiKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBzdGFydEdhbWUgfTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHg6IHggKyBpLCB5IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeCwgeTogeSArIGkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtpXS5zaGlwO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBib2FyZFtpXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzW2pdLnggPT09IHggJiYgY29vcmRpbmF0ZXNbal0ueSA9PT0geSkge1xuICAgICAgICAgIHNoaXAuaGl0KGopO1xuICAgICAgICAgIGFscmVhZHlBdHRhY2tlZC5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc2VkU2hvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWJvYXJkW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmQXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxyZWFkeUF0dGFja2VkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxyZWFkeUF0dGFja2VkW2ldLnggPT09IHggJiYgYWxyZWFkeUF0dGFja2VkW2ldLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmSGl0ID0gKHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGJvYXJkW2ldLmNvb3JkaW5hdGVzO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoY29vcmRpbmF0ZXNbal0ueCA9PT0geCAmJiBjb29yZGluYXRlc1tqXS55ID09PSB5KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBQbGFjZW1lbnRDb29yZGluYXRlcyA9IChsZW5ndGgsIHgsIHksIGRpcmVjdGlvbikgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeDogeCArIGksIHkgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHgsIHk6IHkgKyBpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgICBjaGVja0lmQXR0YWNrZWQsXG4gICAgY2hlY2tJZkhpdCxcbiAgICBnZXRTaGlwUGxhY2VtZW50Q29vcmRpbmF0ZXMsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFja0FJID0gKHgsIHksIG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAob3Bwc0dhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Bwc0dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJHYW1lQm9hcmQsIGF0dGFja0FJIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWkgPSAoKSA9PiB7XG4gIGNvbnN0IGFpR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gKG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgaWYgKG9wcHNHYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICBhdHRhY2sob3Bwc0dhbWVCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wcHNHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWlHYW1lQm9hcmQsIGF0dGFjayB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBoaXRBcnJheSA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcbiAgICBoaXRBcnJheVtwb3NpdGlvbl0gPSB0cnVlO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRBcnJheS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSB0cnVlKTtcbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRBcnJheSwgaGl0LCBpc1N1bmsgfTtcbn07XG4iLCJpbXBvcnQgXCIuLi9zcmMvZG9tL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lL2dhbWVMb29wLmpzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LFxuICByZW5kZXJCb2FyZHMsXG4gIHJlbmRlck1lc3NhZ2UsXG4gIHJlbmRlckdhbWVPdmVyLFxufSBmcm9tIFwiLi4vc3JjL2RvbS9kb20uanNcIjtcblxuY29uc3QgaW5pYXRpYWxQYWdlID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY29udGFpbmVyXCIsIFwiXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRpdGxlXCIsIFwiXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJzdGFydC1idXR0b25cIiwgXCJcIik7XG4gIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIFwiYm9hcmRzLWNvbnRhaW5lclwiLFxuICAgIFwiYm9hcmRzLWNvbnRhaW5lclwiXG4gICk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBnYW1lTG9vcC5zdGFydEdhbWUoKTtcbiAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbmlhdGlhbFBhZ2UpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbn1cblxuKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbn1cblxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG59XG5cbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5ib2R5IHtcbiAgbGluZS1oZWlnaHQ6IDEuNmVtO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLmJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiA0MTBweDtcbiAgaGVpZ2h0OiA0MTBweDtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uY2VsbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNhaUJvYXJkIC5jZWxsOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xufVxuXG4uYm9hcmRzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGdhcDogMnJlbTtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufVxuXG4ubWlzc2VkIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9lbW9qaS80OC8wMDAwMDAvY3Jvc3MtbWFyay1lbW9qaS5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuXG4uaGl0IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9lbW9qaS80OC8wMDAwMDAvZmlyZS5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuXG4uc2hpcC1wbGFjZW1lbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufVxuXG4ubWVzc2FnZS1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5nYW1lLW92ZXItY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZ2FtZS1vdmVyLWdpZnQge1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLnBsYXktYWdhaW4tYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgcGFkZGluZzogMTBweCAyMHB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wbGF5LWFnYWluLWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0NWEwNDk7XG59XG5cbi5vcmllbnRhdGlvbi1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuLnJhbmRvbS1wbGFjZW1lbnQtYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9kb20vc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0FBQ0E7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxvRkFBb0Y7RUFDcEYsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSx3RUFBd0U7RUFDeEUsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG59XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogaW5oZXJpdDtcXG59XFxuXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbn1cXG5cXG5odG1sIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMS42ZW07XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwcHg7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICB3aWR0aDogNDEwcHg7XFxuICBoZWlnaHQ6IDQxMHB4O1xcbn1cXG5cXG4ucm93IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2FpQm9hcmQgLmNlbGw6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG59XFxuXFxuLmJvYXJkcy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGdhcDogMnJlbTtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG59XFxuXFxuLm1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImh0dHBzOi8vaW1nLmljb25zOC5jb20vZW1vamkvNDgvMDAwMDAwL2Nyb3NzLW1hcmstZW1vamkucG5nXFxcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9lbW9qaS80OC8wMDAwMDAvZmlyZS5wbmdcXFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLXBsYWNlbWVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbn1cXG5cXG4ubWVzc2FnZS1jb250YWluZXIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZS1vdmVyLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWUtb3Zlci1naWZ0IHtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLnBsYXktYWdhaW4tYnV0dG9uIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucGxheS1hZ2Fpbi1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1YTA0OTtcXG59XFxuXFxuLm9yaWVudGF0aW9uLWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuXFxuLnJhbmRvbS1wbGFjZW1lbnQtYnV0dG9uIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiaWQiLCJuZXdFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGUxMHgxMGJvYXJkIiwicGxheWVyIiwiYm9hcmQiLCJpIiwicm93IiwiYXBwZW5kQ2hpbGQiLCJqIiwiY2VsbCIsInNldEF0dHJpYnV0ZSIsImJvYXJkc0NvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlTWVzc2FnZSIsIm1lc3NhZ2VDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicmVuZGVyTWVzc2FnZSIsIm1lc3NhZ2UiLCJtZXNzYWdlRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9keSIsImRpc3BsYXlIdW1hblNoaXBzIiwicGxheWVyR2FtZUJvYXJkIiwiaHVtYW5Cb2FyZCIsImxlbmd0aCIsImNvb3JkaW5hdGVzIiwieCIsInkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW5kZXJCb2FyZCIsImdhbWVCb2FyZCIsImJvYXJkSWQiLCJtaXNzZWRTaG90cyIsImJvYXJkU2l6ZSIsImNoaWxkcmVuIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiY2hlY2tJZkF0dGFja2VkIiwiY2hlY2tJZkhpdCIsInJlbmRlckFJQm9hcmQiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsInBsYXlBZ2FpbiIsInBsYXlBZ2FpbkJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImdhbWVPdmVyQ29udGFpbmVyIiwicmVuZGVyR2FtZU92ZXIiLCJ3aW5uZXIiLCJnYW1lT3ZlckdpZnQiLCJnYW1lT3Zlck1lc3NhZ2UiLCJzcmMiLCJpbnNlcnRCZWZvcmUiLCJzaGlwIiwiYWkiLCJnYW1lTG9vcCIsImh1bWFuIiwiY29tcHV0ZXIiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwiY3JlYXRlR2FtZUJvYXJkcyIsImdlbmVyYXRlUmFuZG9tUGxhY2VtZW50IiwiY29uc29sZSIsImxvZyIsImFpR2FtZUJvYXJkIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaGFuZGxlQ2VsbEhvdmVyIiwiaGFuZGxlQ2VsbENsaWNrIiwic3RhcnRHYW1lIiwiZSIsInRhcmdldCIsImdldFNoaXBQbGFjZW1lbnRDb29yZGluYXRlcyIsImNlbGxYIiwiY2VsbFkiLCJzb21lIiwiY29vcmQiLCJjb250YWlucyIsInBsYWNlU2hpcCIsInJlbW92ZUNlbGxFdmVudExpc3RlbmVycyIsImh1bWFuVHVybiIsInNoaXBMZW5ndGhzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwiY29tcHV0ZXJUdXJuIiwic2V0VGltZW91dCIsImF0dGFjayIsImFsbFNoaXBzU3VuayIsImVuZEdhbWUiLCJyZW1vdmVBdHRhY2tMaXN0ZW5lcnMiLCJoYW5kbGVDbGljayIsImF0dGFja0FJIiwiY29vcmRpbmF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhbHJlYWR5QXR0YWNrZWQiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsIm9wcHNHYW1lQm9hcmQiLCJoaXRBcnJheSIsIkFycmF5IiwiZmlsbCIsInBvc2l0aW9uIiwiZXZlcnkiLCJyZW5kZXJCb2FyZHMiLCJpbmlhdGlhbFBhZ2UiLCJjb250YWluZXIiLCJ0aXRsZSIsInN0YXJ0QnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==