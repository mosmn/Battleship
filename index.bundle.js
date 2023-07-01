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
  const startGame = () => {
    human = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.player)();
    computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.ai)();
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(5), 0, 0, "horizontal");
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(4), 0, 1, "horizontal");
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 2, "horizontal");
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 3, "horizontal");
    human.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(2), 0, 4, "horizontal");
    computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(5), 0, 0, "horizontal");
    computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(4), 0, 1, "horizontal");
    computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 2, "horizontal");
    computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 3, "horizontal");
    computer.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(2), 0, 4, "horizontal");
    console.log(computer.aiGameBoard);
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("player");
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("ai");
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.displayHumanShips)(human.playerGameBoard);
    humanTurn();
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
    if (human.playerGameBoard.allShipsSunk()) {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Game Over! You lost!");
      renderGameOver();
    } else {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Congratulations! You won!");
      renderGameOver();
    }
    removeAttackListeners(computer.aiGameBoard);
  };
  const addAttackListeners = gameBoard => {
    const coordinates = document.querySelectorAll("#aiBoard .cell");
    const handleAttack = e => {
      const x = parseInt(e.target.dataset.x, 10);
      const y = parseInt(e.target.dataset.y, 10);
      if (gameBoard.checkIfAttacked(x, y)) {
        return;
      }
      human.attackAI(x, y, gameBoard);
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderAIBoard)(gameBoard);
      if (human.playerGameBoard.allShipsSunk() || computer.aiGameBoard.allShipsSunk()) {
        endGame();
      } else {
        computerTurn();
      }
    };
    coordinates.forEach(coordinate => {
      coordinate.addEventListener("click", handleAttack);
    });
  };
  const removeAttackListeners = gameBoard => {
    const coordinates = document.querySelectorAll(`#${gameBoard} .cell`);
    coordinates.forEach(coordinate => {
      coordinate.removeEventListener("click", handleAttack);
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
  return {
    board,
    missedShots,
    placeShip,
    receiveAttack,
    allShipsSunk,
    checkIfAttacked,
    checkIfHit
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

  &:hover {
    background-color: #ddd;
  }
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
`, "",{"version":3,"sources":["webpack://./src/dom/style.css"],"names":[],"mappings":"AAAA;AACA;;AAEA;EACE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,sBAAsB;EACtB,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,sBAAsB;EACtB,WAAW;EACX,YAAY;;EAEZ;IACE,sBAAsB;EACxB;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,oFAAoF;EACpF,wBAAwB;EACxB,4BAA4B;EAC5B,2BAA2B;AAC7B;;AAEA;EACE,wEAAwE;EACxE,wBAAwB;EACxB,4BAA4B;EAC5B,2BAA2B;AAC7B","sourcesContent":[":root {\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\nhtml {\n  box-sizing: border-box;\n  scroll-behavior: smooth;\n  height: 100%;\n}\n\nbody {\n  line-height: 1.6em;\n  margin: 0;\n  padding: 0px;\n  height: 100vh;\n}\n\n.board {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  background-color: #eee;\n  border: 1px solid #ccc;\n  width: 410px;\n  height: 410px;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.cell {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  width: 100%;\n  height: 100%;\n\n  &:hover {\n    background-color: #ddd;\n  }\n}\n\n.boards-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 2rem;\n}\n\n.ship {\n  background-color: #000;\n}\n\n.missed {\n  background-image: url(\"https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.hit {\n  background-image: url(\"https://img.icons8.com/emoji/48/000000/fire.png\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsQ0FBQ04sMkNBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQztJQUM1REcsS0FBSyxDQUFDdkIsZUFBZSxDQUFDMEIsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzVERyxLQUFLLENBQUN2QixlQUFlLENBQUMwQixTQUFTLENBQUNOLDJDQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUM7SUFDNURHLEtBQUssQ0FBQ3ZCLGVBQWUsQ0FBQzBCLFNBQVMsQ0FBQ04sMkNBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQztJQUM1REcsS0FBSyxDQUFDdkIsZUFBZSxDQUFDMEIsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzVESSxRQUFRLENBQUNHLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzNESSxRQUFRLENBQUNHLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzNESSxRQUFRLENBQUNHLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzNESSxRQUFRLENBQUNHLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzNESSxRQUFRLENBQUNHLFdBQVcsQ0FBQ0QsU0FBUyxDQUFDTiwyQ0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0lBQzNEUSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0wsUUFBUSxDQUFDRyxXQUFXLENBQUM7SUFDakNoRCw2REFBZ0IsQ0FBQyxRQUFRLENBQUM7SUFDMUJBLDZEQUFnQixDQUFDLElBQUksQ0FBQztJQUN0Qm9CLDhEQUFpQixDQUFDd0IsS0FBSyxDQUFDdkIsZUFBZSxDQUFDO0lBQ3hDOEIsU0FBUyxDQUFDLENBQUM7RUFDYixDQUFDO0VBRUQsTUFBTUEsU0FBUyxHQUFHQSxDQUFBLEtBQU07SUFDdEJwQywwREFBYSxDQUFDLDJDQUEyQyxDQUFDO0lBQzFEcUMsa0JBQWtCLENBQUNQLFFBQVEsQ0FBQ0csV0FBVyxDQUFDO0VBQzFDLENBQUM7RUFFRCxNQUFNSyxZQUFZLEdBQUdBLENBQUEsS0FBTTtJQUN6QnRDLDBEQUFhLENBQUMsb0JBQW9CLENBQUM7SUFDbkN1QyxVQUFVLENBQUMsTUFBTTtNQUNmVCxRQUFRLENBQUNVLE1BQU0sQ0FBQ1gsS0FBSyxDQUFDdkIsZUFBZSxDQUFDO01BQ3RDbUIsOERBQWlCLENBQUNJLEtBQUssQ0FBQ3ZCLGVBQWUsQ0FBQztNQUN4QyxJQUNFdUIsS0FBSyxDQUFDdkIsZUFBZSxDQUFDbUMsWUFBWSxDQUFDLENBQUMsSUFDcENYLFFBQVEsQ0FBQ0csV0FBVyxDQUFDUSxZQUFZLENBQUMsQ0FBQyxFQUNuQztRQUNBQyxPQUFPLENBQUMsQ0FBQztNQUNYLENBQUMsTUFBTTtRQUNMTixTQUFTLENBQUMsQ0FBQztNQUNiO0lBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNWLENBQUM7RUFFRCxNQUFNTSxPQUFPLEdBQUdBLENBQUEsS0FBTTtJQUNwQixJQUFJYixLQUFLLENBQUN2QixlQUFlLENBQUNtQyxZQUFZLENBQUMsQ0FBQyxFQUFFO01BQ3hDekMsMERBQWEsQ0FBQyxzQkFBc0IsQ0FBQztNQUNyQzJDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsTUFBTTtNQUNMM0MsMERBQWEsQ0FBQywyQkFBMkIsQ0FBQztNQUMxQzJDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCO0lBQ0FDLHFCQUFxQixDQUFDZCxRQUFRLENBQUNHLFdBQVcsQ0FBQztFQUM3QyxDQUFDO0VBRUQsTUFBTUksa0JBQWtCLEdBQUl0QixTQUFTLElBQUs7SUFDeEMsTUFBTU4sV0FBVyxHQUFHekIsUUFBUSxDQUFDNkQsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7SUFFL0QsTUFBTUMsWUFBWSxHQUFJQyxDQUFDLElBQUs7TUFDMUIsTUFBTXJDLENBQUMsR0FBR1UsUUFBUSxDQUFDMkIsQ0FBQyxDQUFDQyxNQUFNLENBQUMzQixPQUFPLENBQUNYLENBQUMsRUFBRSxFQUFFLENBQUM7TUFDMUMsTUFBTUMsQ0FBQyxHQUFHUyxRQUFRLENBQUMyQixDQUFDLENBQUNDLE1BQU0sQ0FBQzNCLE9BQU8sQ0FBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUUxQyxJQUFJSSxTQUFTLENBQUNPLGVBQWUsQ0FBQ1osQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRTtRQUNuQztNQUNGO01BQ0FrQixLQUFLLENBQUNvQixRQUFRLENBQUN2QyxDQUFDLEVBQUVDLENBQUMsRUFBRUksU0FBUyxDQUFDO01BQy9CUywwREFBYSxDQUFDVCxTQUFTLENBQUM7TUFDeEIsSUFDRWMsS0FBSyxDQUFDdkIsZUFBZSxDQUFDbUMsWUFBWSxDQUFDLENBQUMsSUFDcENYLFFBQVEsQ0FBQ0csV0FBVyxDQUFDUSxZQUFZLENBQUMsQ0FBQyxFQUNuQztRQUNBQyxPQUFPLENBQUMsQ0FBQztNQUNYLENBQUMsTUFBTTtRQUNMSixZQUFZLENBQUMsQ0FBQztNQUNoQjtJQUNGLENBQUM7SUFFRDdCLFdBQVcsQ0FBQ3lDLE9BQU8sQ0FBRUMsVUFBVSxJQUFLO01BQ2xDQSxVQUFVLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRU4sWUFBWSxDQUFDO0lBQ3BELENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRCxNQUFNRixxQkFBcUIsR0FBSTdCLFNBQVMsSUFBSztJQUMzQyxNQUFNTixXQUFXLEdBQUd6QixRQUFRLENBQUM2RCxnQkFBZ0IsQ0FBRSxJQUFHOUIsU0FBVSxRQUFPLENBQUM7SUFDcEVOLFdBQVcsQ0FBQ3lDLE9BQU8sQ0FBRUMsVUFBVSxJQUFLO01BQ2xDQSxVQUFVLENBQUNFLG1CQUFtQixDQUFDLE9BQU8sRUFBRVAsWUFBWSxDQUFDO0lBQ3ZELENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRCxPQUFPO0lBQUVmO0VBQVUsQ0FBQztBQUN0QixDQUFDLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNyR0csTUFBTWhCLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQzdCLE1BQU01QixLQUFLLEdBQUcsRUFBRTtFQUNoQixNQUFNOEIsV0FBVyxHQUFHLEVBQUU7RUFDdEIsTUFBTXFDLGVBQWUsR0FBRyxFQUFFO0VBRTFCLE1BQU10QixTQUFTLEdBQUdBLENBQUNOLElBQUksRUFBRWhCLENBQUMsRUFBRUMsQ0FBQyxFQUFFNEMsU0FBUyxLQUFLO0lBQzNDLE1BQU05QyxXQUFXLEdBQUcsRUFBRTtJQUV0QixJQUFJOEMsU0FBUyxLQUFLLFlBQVksRUFBRTtNQUM5QixLQUFLLElBQUluRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdzQyxJQUFJLENBQUNsQixNQUFNLEVBQUVwQixDQUFDLEVBQUUsRUFBRTtRQUNwQ3FCLFdBQVcsQ0FBQytDLElBQUksQ0FBQztVQUFFOUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUd0QixDQUFDO1VBQUV1QjtRQUFFLENBQUMsQ0FBQztNQUNuQztJQUNGLENBQUMsTUFBTSxJQUFJNEMsU0FBUyxLQUFLLFVBQVUsRUFBRTtNQUNuQyxLQUFLLElBQUluRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdzQyxJQUFJLENBQUNsQixNQUFNLEVBQUVwQixDQUFDLEVBQUUsRUFBRTtRQUNwQ3FCLFdBQVcsQ0FBQytDLElBQUksQ0FBQztVQUFFOUMsQ0FBQztVQUFFQyxDQUFDLEVBQUVBLENBQUMsR0FBR3ZCO1FBQUUsQ0FBQyxDQUFDO01BQ25DO0lBQ0Y7SUFFQUQsS0FBSyxDQUFDcUUsSUFBSSxDQUFDO01BQUU5QixJQUFJO01BQUVqQjtJQUFZLENBQUMsQ0FBQztFQUNuQyxDQUFDO0VBRUQsTUFBTWdELGFBQWEsR0FBR0EsQ0FBQy9DLENBQUMsRUFBRUMsQ0FBQyxLQUFLO0lBQzlCLEtBQUssSUFBSXZCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsS0FBSyxDQUFDcUIsTUFBTSxFQUFFcEIsQ0FBQyxFQUFFLEVBQUU7TUFDckMsTUFBTXNDLElBQUksR0FBR3ZDLEtBQUssQ0FBQ0MsQ0FBQyxDQUFDLENBQUNzQyxJQUFJO01BQzFCLE1BQU1qQixXQUFXLEdBQUd0QixLQUFLLENBQUNDLENBQUMsQ0FBQyxDQUFDcUIsV0FBVztNQUN4QyxLQUFLLElBQUlsQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrQixXQUFXLENBQUNELE1BQU0sRUFBRWpCLENBQUMsRUFBRSxFQUFFO1FBQzNDLElBQUlrQixXQUFXLENBQUNsQixDQUFDLENBQUMsQ0FBQ21CLENBQUMsS0FBS0EsQ0FBQyxJQUFJRCxXQUFXLENBQUNsQixDQUFDLENBQUMsQ0FBQ29CLENBQUMsS0FBS0EsQ0FBQyxFQUFFO1VBQ3BEZSxJQUFJLENBQUNnQyxHQUFHLENBQUNuRSxDQUFDLENBQUM7VUFDWCtELGVBQWUsQ0FBQ0UsSUFBSSxDQUFDO1lBQUU5QyxDQUFDO1lBQUVDO1VBQUUsQ0FBQyxDQUFDO1VBQzlCO1FBQ0Y7TUFDRjtJQUNGO0lBQ0FNLFdBQVcsQ0FBQ3VDLElBQUksQ0FBQztNQUFFOUMsQ0FBQztNQUFFQztJQUFFLENBQUMsQ0FBQztJQUMxQjJDLGVBQWUsQ0FBQ0UsSUFBSSxDQUFDO01BQUU5QyxDQUFDO01BQUVDO0lBQUUsQ0FBQyxDQUFDO0VBQ2hDLENBQUM7RUFFRCxNQUFNOEIsWUFBWSxHQUFHQSxDQUFBLEtBQU07SUFDekIsS0FBSyxJQUFJckQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxLQUFLLENBQUNxQixNQUFNLEVBQUVwQixDQUFDLEVBQUUsRUFBRTtNQUNyQyxJQUFJLENBQUNELEtBQUssQ0FBQ0MsQ0FBQyxDQUFDLENBQUNzQyxJQUFJLENBQUNpQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sS0FBSztNQUNkO0lBQ0Y7SUFDQSxPQUFPLElBQUk7RUFDYixDQUFDO0VBRUQsTUFBTXJDLGVBQWUsR0FBR0EsQ0FBQ1osQ0FBQyxFQUFFQyxDQUFDLEtBQUs7SUFDaEMsS0FBSyxJQUFJdkIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0UsZUFBZSxDQUFDOUMsTUFBTSxFQUFFcEIsQ0FBQyxFQUFFLEVBQUU7TUFDL0MsSUFBSWtFLGVBQWUsQ0FBQ2xFLENBQUMsQ0FBQyxDQUFDc0IsQ0FBQyxLQUFLQSxDQUFDLElBQUk0QyxlQUFlLENBQUNsRSxDQUFDLENBQUMsQ0FBQ3VCLENBQUMsS0FBS0EsQ0FBQyxFQUFFO1FBQzVELE9BQU8sSUFBSTtNQUNiO0lBQ0Y7SUFDQSxPQUFPLEtBQUs7RUFDZCxDQUFDO0VBRUQsTUFBTVksVUFBVSxHQUFHQSxDQUFDYixDQUFDLEVBQUVDLENBQUMsS0FBSztJQUMzQixLQUFLLElBQUl2QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELEtBQUssQ0FBQ3FCLE1BQU0sRUFBRXBCLENBQUMsRUFBRSxFQUFFO01BQ3JDLE1BQU1xQixXQUFXLEdBQUd0QixLQUFLLENBQUNDLENBQUMsQ0FBQyxDQUFDcUIsV0FBVztNQUN4QyxLQUFLLElBQUlsQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdrQixXQUFXLENBQUNELE1BQU0sRUFBRWpCLENBQUMsRUFBRSxFQUFFO1FBQzNDLElBQUlrQixXQUFXLENBQUNsQixDQUFDLENBQUMsQ0FBQ21CLENBQUMsS0FBS0EsQ0FBQyxJQUFJRCxXQUFXLENBQUNsQixDQUFDLENBQUMsQ0FBQ29CLENBQUMsS0FBS0EsQ0FBQyxFQUFFO1VBQ3BELE9BQU8sSUFBSTtRQUNiO01BQ0Y7SUFDRjtJQUNBLE9BQU8sS0FBSztFQUNkLENBQUM7RUFFRCxPQUFPO0lBQ0x4QixLQUFLO0lBQ0w4QixXQUFXO0lBQ1hlLFNBQVM7SUFDVHlCLGFBQWE7SUFDYmhCLFlBQVk7SUFDWm5CLGVBQWU7SUFDZkM7RUFDRixDQUFDO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzVFMEM7QUFFcEMsTUFBTXJDLE1BQU0sR0FBR0EsQ0FBQSxLQUFNO0VBQzFCLE1BQU1vQixlQUFlLEdBQUdTLHdEQUFTLENBQUMsQ0FBQztFQUVuQyxNQUFNa0MsUUFBUSxHQUFHQSxDQUFDdkMsQ0FBQyxFQUFFQyxDQUFDLEVBQUVpRCxhQUFhLEtBQUs7SUFDeEMsSUFBSUEsYUFBYSxDQUFDdEMsZUFBZSxDQUFDWixDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFO01BQ3ZDO0lBQ0YsQ0FBQyxNQUFNO01BQ0xpRCxhQUFhLENBQUNILGFBQWEsQ0FBQy9DLENBQUMsRUFBRUMsQ0FBQyxDQUFDO0lBQ25DO0VBQ0YsQ0FBQztFQUVELE9BQU87SUFBRUwsZUFBZTtJQUFFMkM7RUFBUyxDQUFDO0FBQ3RDLENBQUM7QUFFTSxNQUFNdEIsRUFBRSxHQUFHQSxDQUFBLEtBQU07RUFDdEIsTUFBTU0sV0FBVyxHQUFHbEIsd0RBQVMsQ0FBQyxDQUFDO0VBRS9CLE1BQU15QixNQUFNLEdBQUlvQixhQUFhLElBQUs7SUFDaEMsTUFBTWxELENBQUMsR0FBR21ELElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLE1BQU1wRCxDQUFDLEdBQUdrRCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QyxJQUFJSCxhQUFhLENBQUN0QyxlQUFlLENBQUNaLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUU7TUFDdkM2QixNQUFNLENBQUNvQixhQUFhLENBQUM7SUFDdkIsQ0FBQyxNQUFNO01BQ0xBLGFBQWEsQ0FBQ0gsYUFBYSxDQUFDL0MsQ0FBQyxFQUFFQyxDQUFDLENBQUM7SUFDbkM7RUFDRixDQUFDO0VBRUQsT0FBTztJQUFFc0IsV0FBVztJQUFFTztFQUFPLENBQUM7QUFDaEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUM5Qk0sTUFBTWQsSUFBSSxHQUFJbEIsTUFBTSxJQUFLO0VBQzlCLE1BQU13RCxRQUFRLEdBQUcsSUFBSUMsS0FBSyxDQUFDekQsTUFBTSxDQUFDLENBQUMwRCxJQUFJLENBQUMsS0FBSyxDQUFDO0VBQzlDLE1BQU1SLEdBQUcsR0FBSVMsUUFBUSxJQUFLO0lBQ3hCSCxRQUFRLENBQUNHLFFBQVEsQ0FBQyxHQUFHLElBQUk7RUFDM0IsQ0FBQztFQUNELE1BQU1SLE1BQU0sR0FBR0EsQ0FBQSxLQUFNSyxRQUFRLENBQUNJLEtBQUssQ0FBRUQsUUFBUSxJQUFLQSxRQUFRLEtBQUssSUFBSSxDQUFDO0VBQ3BFLE9BQU87SUFBRTNELE1BQU07SUFBRXdELFFBQVE7SUFBRU4sR0FBRztJQUFFQztFQUFPLENBQUM7QUFDMUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1AwQjtBQUNtQjtBQU1uQjtBQUUzQixNQUFNVyxZQUFZLEdBQUdBLENBQUEsS0FBTTtFQUN6QixNQUFNQyxTQUFTLEdBQUc1Riw4REFBYSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDO0VBQ3ZELE1BQU02RixLQUFLLEdBQUc3Riw4REFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO0VBQzlDNkYsS0FBSyxDQUFDckUsV0FBVyxHQUFHLFlBQVk7RUFDaEMsTUFBTXNFLFdBQVcsR0FBRzlGLDhEQUFhLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUM7RUFDL0Q4RixXQUFXLENBQUN0RSxXQUFXLEdBQUcsWUFBWTtFQUN0Q29FLFNBQVMsQ0FBQ2pGLFdBQVcsQ0FBQ2tGLEtBQUssQ0FBQztFQUM1QkQsU0FBUyxDQUFDakYsV0FBVyxDQUFDbUYsV0FBVyxDQUFDO0VBQ2xDekYsUUFBUSxDQUFDb0IsSUFBSSxDQUFDZCxXQUFXLENBQUNpRixTQUFTLENBQUM7RUFDcEMsTUFBTTdFLGVBQWUsR0FBR2YsOERBQWEsQ0FDbkMsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixrQkFDRixDQUFDO0VBQ0RLLFFBQVEsQ0FBQ29CLElBQUksQ0FBQ2QsV0FBVyxDQUFDSSxlQUFlLENBQUM7RUFFMUMrRSxXQUFXLENBQUNyQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUMxQ21CLFNBQVMsQ0FBQ3hFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCNkIsdURBQVEsQ0FBQ0csU0FBUyxDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEL0MsUUFBUSxDQUFDb0UsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVrQixZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CM0Q7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxvRkFBb0YsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFdBQVcsS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxpQ0FBaUMsR0FBRyxPQUFPLGNBQWMsZUFBZSx3QkFBd0IsR0FBRywwQkFBMEIsY0FBYyxlQUFlLHdCQUF3QixHQUFHLFVBQVUsMkJBQTJCLDRCQUE0QixpQkFBaUIsR0FBRyxVQUFVLHVCQUF1QixjQUFjLGlCQUFpQixrQkFBa0IsR0FBRyxZQUFZLGtCQUFrQix3Q0FBd0MsMkJBQTJCLDJCQUEyQixpQkFBaUIsa0JBQWtCLEdBQUcsVUFBVSxrQkFBa0IsMkNBQTJDLEdBQUcsV0FBVywyQkFBMkIsMkJBQTJCLGdCQUFnQixpQkFBaUIsZUFBZSw2QkFBNkIsS0FBSyxHQUFHLHVCQUF1QixrQkFBa0Isd0JBQXdCLDRCQUE0QixpQkFBaUIsY0FBYyxHQUFHLFdBQVcsMkJBQTJCLEdBQUcsYUFBYSwyRkFBMkYsNkJBQTZCLGlDQUFpQyxnQ0FBZ0MsR0FBRyxVQUFVLCtFQUErRSw2QkFBNkIsaUNBQWlDLGdDQUFnQyxHQUFHLHFCQUFxQjtBQUNyOUQ7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUN0RjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFzRztBQUN0RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSWdEO0FBQ3hFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL3N0eWxlLmNzcz9iYjVkIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZWxlbWVudCwgY2xhc3NOYW1lLCBpZCkgPT4ge1xuICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgbmV3RWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIG5ld0VsZW1lbnQuaWQgPSBpZDtcbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlMTB4MTBib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiYm9hcmRcIiwgYCR7cGxheWVyfUJvYXJkYCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJyb3dcIiwgYHJvdyR7aX1gKTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJjZWxsXCIsIFwiXCIpO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXhcIiwgaik7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImRhdGEteVwiLCBpKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZHMtY29udGFpbmVyXCIpO1xuICBib2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xufTtcblxuY29uc3QgcmVtb3ZlTWVzc2FnZSA9ICgpID0+IHtcbiAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS1jb250YWluZXJcIik7XG4gIG1lc3NhZ2VDb250YWluZXIucmVtb3ZlKCk7XG59XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS1jb250YWluZXJcIikpIHtcbiAgICByZW1vdmVNZXNzYWdlKCk7XG4gIH1cbiAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtZXNzYWdlLWNvbnRhaW5lclwiLCBcIlwiKTtcbiAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwicFwiLCBcIm1lc3NhZ2VcIiwgXCJcIik7XG4gIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgbWVzc2FnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcGxheUh1bWFuU2hpcHMgPSAocGxheWVyR2FtZUJvYXJkKSA9PiB7XG4gIGNvbnN0IGh1bWFuQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllckJvYXJkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckdhbWVCb2FyZC5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gcGxheWVyR2FtZUJvYXJkLmJvYXJkW2ldLmNvb3JkaW5hdGVzO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHggPSBjb29yZGluYXRlc1tqXS54O1xuICAgICAgY29uc3QgeSA9IGNvb3JkaW5hdGVzW2pdLnk7XG4gICAgICBjb25zdCBjZWxsID0gaHVtYW5Cb2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWBcbiAgICAgICk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCByZW5kZXJCb2FyZCA9IChnYW1lQm9hcmQsIGJvYXJkSWQpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZElkKTtcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBnYW1lQm9hcmQubWlzc2VkU2hvdHM7XG4gIGNvbnN0IGJvYXJkU2l6ZSA9IGJvYXJkLmNoaWxkcmVuLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG1pc3NlZFNob3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBtaXNzZWRTaG90c1tpXTtcbiAgICBjb25zdCBjZWxsID0gYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTaXplOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBib2FyZC5jaGlsZHJlbltpXS5jaGlsZHJlbjtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRTaXplOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSByb3dbal07XG4gICAgICBjb25zdCB4ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LngpO1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KGNlbGwuZGF0YXNldC55KTtcblxuICAgICAgaWYgKGdhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkgJiYgZ2FtZUJvYXJkLmNoZWNrSWZIaXQoeCwgeSkpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckFJQm9hcmQgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gIHJlbmRlckJvYXJkKGdhbWVCb2FyZCwgXCJhaUJvYXJkXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlclBsYXllckJvYXJkID0gKGdhbWVCb2FyZCkgPT4ge1xuICByZW5kZXJCb2FyZChnYW1lQm9hcmQsIFwicGxheWVyQm9hcmRcIik7XG59O1xuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IHBsYXllciwgYWkgfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZTEweDEwYm9hcmQsXG4gIHJlbmRlck1lc3NhZ2UsXG4gIGRpc3BsYXlIdW1hblNoaXBzLFxuICByZW5kZXJBSUJvYXJkLFxuICByZW5kZXJQbGF5ZXJCb2FyZCxcbn0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVMb29wID0gKCgpID0+IHtcbiAgbGV0IGh1bWFuID0gbnVsbDtcbiAgbGV0IGNvbXB1dGVyID0gbnVsbDtcblxuICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgaHVtYW4gPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlciA9IGFpKCk7XG4gICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDUpLCAwLCAwLCBcImhvcml6b250YWxcIik7XG4gICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDQpLCAwLCAxLCBcImhvcml6b250YWxcIik7XG4gICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDMpLCAwLCAyLCBcImhvcml6b250YWxcIik7XG4gICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDMpLCAwLCAzLCBcImhvcml6b250YWxcIik7XG4gICAgaHVtYW4ucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDIpLCAwLCA0LCBcImhvcml6b250YWxcIik7XG4gICAgY29tcHV0ZXIuYWlHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoNSksIDAsIDAsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICBjb21wdXRlci5haUdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCg0KSwgMCwgMSwgXCJob3Jpem9udGFsXCIpO1xuICAgIGNvbXB1dGVyLmFpR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDMpLCAwLCAyLCBcImhvcml6b250YWxcIik7XG4gICAgY29tcHV0ZXIuYWlHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoMyksIDAsIDMsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICBjb21wdXRlci5haUdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCgyKSwgMCwgNCwgXCJob3Jpem9udGFsXCIpO1xuICAgIGNvbnNvbGUubG9nKGNvbXB1dGVyLmFpR2FtZUJvYXJkKTtcbiAgICBjcmVhdGUxMHgxMGJvYXJkKFwicGxheWVyXCIpO1xuICAgIGNyZWF0ZTEweDEwYm9hcmQoXCJhaVwiKTtcbiAgICBkaXNwbGF5SHVtYW5TaGlwcyhodW1hbi5wbGF5ZXJHYW1lQm9hcmQpO1xuICAgIGh1bWFuVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IGh1bWFuVHVybiA9ICgpID0+IHtcbiAgICByZW5kZXJNZXNzYWdlKFwiWW91ciB0dXJuISBTZWxlY3QgYSBjb29yZGluYXRlIHRvIGF0dGFjay5cIik7XG4gICAgYWRkQXR0YWNrTGlzdGVuZXJzKGNvbXB1dGVyLmFpR2FtZUJvYXJkKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcbiAgICByZW5kZXJNZXNzYWdlKFwiQ29tcHV0ZXIncyB0dXJuLi4uXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcHV0ZXIuYXR0YWNrKGh1bWFuLnBsYXllckdhbWVCb2FyZCk7XG4gICAgICByZW5kZXJQbGF5ZXJCb2FyZChodW1hbi5wbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgaWYgKFxuICAgICAgICBodW1hbi5wbGF5ZXJHYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkgfHxcbiAgICAgICAgY29tcHV0ZXIuYWlHYW1lQm9hcmQuYWxsU2hpcHNTdW5rKClcbiAgICAgICkge1xuICAgICAgICBlbmRHYW1lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBodW1hblR1cm4oKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfTtcbiAgXG4gIGNvbnN0IGVuZEdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGh1bWFuLnBsYXllckdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgcmVuZGVyTWVzc2FnZShcIkdhbWUgT3ZlciEgWW91IGxvc3QhXCIpO1xuICAgICAgcmVuZGVyR2FtZU92ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVuZGVyTWVzc2FnZShcIkNvbmdyYXR1bGF0aW9ucyEgWW91IHdvbiFcIik7XG4gICAgICByZW5kZXJHYW1lT3ZlcigpO1xuICAgIH1cbiAgICByZW1vdmVBdHRhY2tMaXN0ZW5lcnMoY29tcHV0ZXIuYWlHYW1lQm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IGFkZEF0dGFja0xpc3RlbmVycyA9IChnYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjYWlCb2FyZCAuY2VsbFwiKTtcblxuICAgIGNvbnN0IGhhbmRsZUF0dGFjayA9IChlKSA9PiB7XG4gICAgICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC55LCAxMCk7XG5cbiAgICAgIGlmIChnYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGh1bWFuLmF0dGFja0FJKHgsIHksIGdhbWVCb2FyZCk7XG4gICAgICByZW5kZXJBSUJvYXJkKGdhbWVCb2FyZCk7XG4gICAgICBpZiAoXG4gICAgICAgIGh1bWFuLnBsYXllckdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKSB8fFxuICAgICAgICBjb21wdXRlci5haUdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGVuZEdhbWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXB1dGVyVHVybigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVBdHRhY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUF0dGFja0xpc3RlbmVycyA9IChnYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2dhbWVCb2FyZH0gLmNlbGxgKTtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb29yZGluYXRlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVBdHRhY2spO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7IHN0YXJ0R2FtZSB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGNvbnN0IG1pc3NlZFNob3RzID0gW107XG4gIGNvbnN0IGFscmVhZHlBdHRhY2tlZCA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5LCBkaXJlY3Rpb24pID0+IHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeDogeCArIGksIHkgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goeyB4LCB5OiB5ICsgaSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBib2FyZC5wdXNoKHsgc2hpcCwgY29vcmRpbmF0ZXMgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW2ldLnNoaXA7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGJvYXJkW2ldLmNvb3JkaW5hdGVzO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoY29vcmRpbmF0ZXNbal0ueCA9PT0geCAmJiBjb29yZGluYXRlc1tqXS55ID09PSB5KSB7XG4gICAgICAgICAgc2hpcC5oaXQoaik7XG4gICAgICAgICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBtaXNzZWRTaG90cy5wdXNoKHsgeCwgeSB9KTtcbiAgICBhbHJlYWR5QXR0YWNrZWQucHVzaCh7IHgsIHkgfSk7XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghYm9hcmRbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSWZBdHRhY2tlZCA9ICh4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbHJlYWR5QXR0YWNrZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhbHJlYWR5QXR0YWNrZWRbaV0ueCA9PT0geCAmJiBhbHJlYWR5QXR0YWNrZWRbaV0ueSA9PT0geSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSWZIaXQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gYm9hcmRbaV0uY29vcmRpbmF0ZXM7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChjb29yZGluYXRlc1tqXS54ID09PSB4ICYmIGNvb3JkaW5hdGVzW2pdLnkgPT09IHkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTaGlwc1N1bmssXG4gICAgY2hlY2tJZkF0dGFja2VkLFxuICAgIGNoZWNrSWZIaXQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFja0FJID0gKHgsIHksIG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAob3Bwc0dhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Bwc0dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJHYW1lQm9hcmQsIGF0dGFja0FJIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWkgPSAoKSA9PiB7XG4gIGNvbnN0IGFpR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gKG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgaWYgKG9wcHNHYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICBhdHRhY2sob3Bwc0dhbWVCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wcHNHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWlHYW1lQm9hcmQsIGF0dGFjayB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBoaXRBcnJheSA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcbiAgICBoaXRBcnJheVtwb3NpdGlvbl0gPSB0cnVlO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRBcnJheS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSB0cnVlKTtcbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRBcnJheSwgaGl0LCBpc1N1bmsgfTtcbn07XG4iLCJpbXBvcnQgXCIuLi9zcmMvZG9tL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lL2dhbWVMb29wLmpzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LFxuICByZW5kZXJCb2FyZHMsXG4gIHJlbmRlck1lc3NhZ2UsXG4gIHJlbmRlckdhbWVPdmVyLFxufSBmcm9tIFwiLi4vc3JjL2RvbS9kb20uanNcIjtcblxuY29uc3QgaW5pYXRpYWxQYWdlID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY29udGFpbmVyXCIsIFwiXCIpO1xuICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRpdGxlXCIsIFwiXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJzdGFydC1idXR0b25cIiwgXCJcIik7XG4gIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIFwiYm9hcmRzLWNvbnRhaW5lclwiLFxuICAgIFwiYm9hcmRzLWNvbnRhaW5lclwiXG4gICk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBnYW1lTG9vcC5zdGFydEdhbWUoKTtcbiAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbmlhdGlhbFBhZ2UpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbn1cblxuKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbn1cblxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG59XG5cbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5ib2R5IHtcbiAgbGluZS1oZWlnaHQ6IDEuNmVtO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLmJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiA0MTBweDtcbiAgaGVpZ2h0OiA0MTBweDtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uY2VsbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcbiAgfVxufVxuXG4uYm9hcmRzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGdhcDogMnJlbTtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufVxuXG4ubWlzc2VkIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9lbW9qaS80OC8wMDAwMDAvY3Jvc3MtbWFyay1lbW9qaS5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuXG4uaGl0IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9lbW9qaS80OC8wMDAwMDAvZmlyZS5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvZG9tL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtBQUNBOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsU0FBUztFQUNULFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7O0VBRVo7SUFDRSxzQkFBc0I7RUFDeEI7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxvRkFBb0Y7RUFDcEYsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSx3RUFBd0U7RUFDeEUsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QiwyQkFBMkI7QUFDN0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbn1cXG5cXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxufVxcblxcbmh0bWwge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjZlbTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHdpZHRoOiA0MTBweDtcXG4gIGhlaWdodDogNDEwcHg7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcblxcbiAgJjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxuICB9XFxufVxcblxcbi5ib2FyZHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBnYXA6IDJyZW07XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxufVxcblxcbi5taXNzZWQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJodHRwczovL2ltZy5pY29uczguY29tL2Vtb2ppLzQ4LzAwMDAwMC9jcm9zcy1tYXJrLWVtb2ppLnBuZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImh0dHBzOi8vaW1nLmljb25zOC5jb20vZW1vamkvNDgvMDAwMDAwL2ZpcmUucG5nXFxcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiaWQiLCJuZXdFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGUxMHgxMGJvYXJkIiwicGxheWVyIiwiYm9hcmQiLCJpIiwicm93IiwiYXBwZW5kQ2hpbGQiLCJqIiwiY2VsbCIsInNldEF0dHJpYnV0ZSIsImJvYXJkc0NvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlTWVzc2FnZSIsIm1lc3NhZ2VDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwicmVtb3ZlIiwicmVuZGVyTWVzc2FnZSIsIm1lc3NhZ2UiLCJtZXNzYWdlRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9keSIsImRpc3BsYXlIdW1hblNoaXBzIiwicGxheWVyR2FtZUJvYXJkIiwiaHVtYW5Cb2FyZCIsImxlbmd0aCIsImNvb3JkaW5hdGVzIiwieCIsInkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW5kZXJCb2FyZCIsImdhbWVCb2FyZCIsImJvYXJkSWQiLCJtaXNzZWRTaG90cyIsImJvYXJkU2l6ZSIsImNoaWxkcmVuIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiY2hlY2tJZkF0dGFja2VkIiwiY2hlY2tJZkhpdCIsInJlbmRlckFJQm9hcmQiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsInNoaXAiLCJhaSIsImdhbWVMb29wIiwiaHVtYW4iLCJjb21wdXRlciIsInN0YXJ0R2FtZSIsInBsYWNlU2hpcCIsImFpR2FtZUJvYXJkIiwiY29uc29sZSIsImxvZyIsImh1bWFuVHVybiIsImFkZEF0dGFja0xpc3RlbmVycyIsImNvbXB1dGVyVHVybiIsInNldFRpbWVvdXQiLCJhdHRhY2siLCJhbGxTaGlwc1N1bmsiLCJlbmRHYW1lIiwicmVuZGVyR2FtZU92ZXIiLCJyZW1vdmVBdHRhY2tMaXN0ZW5lcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFuZGxlQXR0YWNrIiwiZSIsInRhcmdldCIsImF0dGFja0FJIiwiZm9yRWFjaCIsImNvb3JkaW5hdGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFscmVhZHlBdHRhY2tlZCIsImRpcmVjdGlvbiIsInB1c2giLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwib3Bwc0dhbWVCb2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImhpdEFycmF5IiwiQXJyYXkiLCJmaWxsIiwicG9zaXRpb24iLCJldmVyeSIsInJlbmRlckJvYXJkcyIsImluaWF0aWFsUGFnZSIsImNvbnRhaW5lciIsInRpdGxlIiwic3RhcnRCdXR0b24iXSwic291cmNlUm9vdCI6IiJ9