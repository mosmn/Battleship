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
/* harmony export */   renderMessage: () => (/* binding */ renderMessage)
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
const renderMessage = message => {
  const messageContainer = createElement("div", "message-container", "");
  const messageElement = createElement("p", "message", "");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  document.body.appendChild(messageContainer);
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
  let currentPlayer = null;
  let opponent = null;
  const startGame = () => {
    currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.player)();
    opponent = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__.ai)();
    currentPlayer.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(5), 0, 0, "horizontal");
    currentPlayer.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(4), 0, 1, "horizontal");
    currentPlayer.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 2, "horizontal");
    currentPlayer.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 3, "horizontal");
    currentPlayer.playerGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(2), 0, 4, "horizontal");
    opponent.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(5), 0, 0, "horizontal");
    opponent.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(4), 0, 1, "horizontal");
    opponent.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 2, "horizontal");
    opponent.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(3), 0, 3, "horizontal");
    opponent.aiGameBoard.placeShip((0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(2), 0, 4, "horizontal");
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("player");
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.create10x10board)("ai");
    playTurn();
  };
  const playTurn = () => {
    if (currentPlayer === currentPlayer) {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Your turn! Select a coordinate to attack.");
      addAttackListeners(opponent.aiGameBoard);
    } else {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Computer's turn...");
      setTimeout(() => {
        opponent.attack(currentPlayer.playerGameBoard);
        renderBoards(currentPlayer.playerGameBoard.board, opponent.aiGameBoard.board);
        if (currentPlayer.playerGameBoard.allShipsSunk() || opponent.aiGameBoard.allShipsSunk()) {
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
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Game Over! You lost!");
      renderGameOver();
    } else {
      (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_2__.renderMessage)("Congratulations! You won!");
      renderGameOver();
    }
    removeAttackListeners(opponent.aiGameBoard);
  };
  const addAttackListeners = gameBoard => {
    const coordinates = document.querySelectorAll(".cell");
    coordinates.forEach(coordinate => {
      coordinate.addEventListener("click", handleAttack);
    });
  };
  const handleAttack = e => {
    const x = e.target.getAttribute("data-x");
    const y = e.target.getAttribute("data-y");
    currentPlayer.attackAI(x, y, gameBoard);
    renderBoards(currentPlayer.playerGameBoard.board, opponent.aiGameBoard.board);
    if (currentPlayer.playerGameBoard.allShipsSunk() || opponent.aiGameBoard.allShipsSunk()) {
      endGame();
    } else {
      currentPlayer = opponent;
      opponent = currentPlayer;
      playTurn();
    }
  };
  const removeAttackListeners = gameBoard => {
    const coordinates = document.querySelectorAll(".cell");
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
  return {
    board,
    missedShots,
    placeShip,
    receiveAttack,
    allShipsSunk,
    checkIfAttacked
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
`, "",{"version":3,"sources":["webpack://./src/dom/style.css"],"names":[],"mappings":"AAAA;AACA;;AAEA;EACE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;;EAEE,SAAS;EACT,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,sBAAsB;EACtB,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,sBAAsB;EACtB,WAAW;EACX,YAAY;;EAEZ;IACE,sBAAsB;EACxB;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB","sourcesContent":[":root {\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\nhtml {\n  box-sizing: border-box;\n  scroll-behavior: smooth;\n  height: 100%;\n}\n\nbody {\n  line-height: 1.6em;\n  margin: 0;\n  padding: 0px;\n  height: 100vh;\n}\n\n.board {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  background-color: #eee;\n  border: 1px solid #ccc;\n  width: 410px;\n  height: 410px;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.cell {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  width: 100%;\n  height: 100%;\n\n  &:hover {\n    background-color: #ddd;\n  }\n}\n\n.boards-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 2rem;\n}\n\n.ship {\n  background-color: #000;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS9zdHlsZS5jc3M/YmI1ZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtZW50ID0gKGVsZW1lbnQsIGNsYXNzTmFtZSwgaWQpID0+IHtcbiAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gIG5ld0VsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICBuZXdFbGVtZW50LmlkID0gaWQ7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZTEweDEwYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImJvYXJkXCIsIGAke3BsYXllcn1Cb2FyZGApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwicm93XCIsIGByb3cke2l9YCk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiY2VsbFwiLCBcIlwiKTtcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGopO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgaSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRzLWNvbnRhaW5lclwiKTtcbiAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJtZXNzYWdlLWNvbnRhaW5lclwiLCBcIlwiKTtcbiAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwicFwiLCBcIm1lc3NhZ2VcIiwgXCJcIik7XG4gIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgbWVzc2FnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRhaW5lcik7XG59O1xuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IHBsYXllciwgYWkgfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCB7IGNyZWF0ZTEweDEwYm9hcmQsIHJlbmRlck1lc3NhZ2UgfSBmcm9tICcuLi9kb20vZG9tLmpzJztcblxuZXhwb3J0IGNvbnN0IGdhbWVMb29wID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBudWxsO1xuICBsZXQgb3Bwb25lbnQgPSBudWxsO1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBjdXJyZW50UGxheWVyID0gcGxheWVyKCk7XG4gICAgb3Bwb25lbnQgPSBhaSgpO1xuICAgIGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDUpLCAwLCAwLCBcImhvcml6b250YWxcIik7XG4gICAgY3VycmVudFBsYXllci5wbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoNCksIDAsIDEsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICBjdXJyZW50UGxheWVyLnBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCgzKSwgMCwgMiwgXCJob3Jpem9udGFsXCIpO1xuICAgIGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDMpLCAwLCAzLCBcImhvcml6b250YWxcIik7XG4gICAgY3VycmVudFBsYXllci5wbGF5ZXJHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoMiksIDAsIDQsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICBvcHBvbmVudC5haUdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCg1KSwgMCwgMCwgXCJob3Jpem9udGFsXCIpO1xuICAgIG9wcG9uZW50LmFpR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDQpLCAwLCAxLCBcImhvcml6b250YWxcIik7XG4gICAgb3Bwb25lbnQuYWlHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAoMyksIDAsIDIsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICBvcHBvbmVudC5haUdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCgzKSwgMCwgMywgXCJob3Jpem9udGFsXCIpO1xuICAgIG9wcG9uZW50LmFpR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwKDIpLCAwLCA0LCBcImhvcml6b250YWxcIik7XG4gICAgY3JlYXRlMTB4MTBib2FyZChcInBsYXllclwiKTtcbiAgICBjcmVhdGUxMHgxMGJvYXJkKFwiYWlcIik7XG4gICAgcGxheVR1cm4oKTtcbiAgfTtcblxuICBjb25zdCBwbGF5VHVybiA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFBsYXllciA9PT0gY3VycmVudFBsYXllcikge1xuICAgICAgcmVuZGVyTWVzc2FnZShcIllvdXIgdHVybiEgU2VsZWN0IGEgY29vcmRpbmF0ZSB0byBhdHRhY2suXCIpO1xuICAgICAgYWRkQXR0YWNrTGlzdGVuZXJzKG9wcG9uZW50LmFpR2FtZUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVuZGVyTWVzc2FnZShcIkNvbXB1dGVyJ3MgdHVybi4uLlwiKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvcHBvbmVudC5hdHRhY2soY3VycmVudFBsYXllci5wbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgICByZW5kZXJCb2FyZHMoXG4gICAgICAgICAgY3VycmVudFBsYXllci5wbGF5ZXJHYW1lQm9hcmQuYm9hcmQsXG4gICAgICAgICAgb3Bwb25lbnQuYWlHYW1lQm9hcmQuYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpIHx8XG4gICAgICAgICAgb3Bwb25lbnQuYWlHYW1lQm9hcmQuYWxsU2hpcHNTdW5rKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgZW5kR2FtZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBvcHBvbmVudDtcbiAgICAgICAgICBvcHBvbmVudCA9IGN1cnJlbnRQbGF5ZXI7XG4gICAgICAgICAgcGxheVR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVuZEdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICByZW5kZXJNZXNzYWdlKFwiR2FtZSBPdmVyISBZb3UgbG9zdCFcIik7XG4gICAgICByZW5kZXJHYW1lT3ZlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJNZXNzYWdlKFwiQ29uZ3JhdHVsYXRpb25zISBZb3Ugd29uIVwiKTtcbiAgICAgIHJlbmRlckdhbWVPdmVyKCk7XG4gICAgfVxuICAgIHJlbW92ZUF0dGFja0xpc3RlbmVycyhvcHBvbmVudC5haUdhbWVCb2FyZCk7XG4gIH07XG5cbiAgY29uc3QgYWRkQXR0YWNrTGlzdGVuZXJzID0gKGdhbWVCb2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpO1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgIGNvb3JkaW5hdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUF0dGFjayk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS14XCIpO1xuICAgIGNvbnN0IHkgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIik7XG4gICAgY3VycmVudFBsYXllci5hdHRhY2tBSSh4LCB5LCBnYW1lQm9hcmQpO1xuICAgIHJlbmRlckJvYXJkcyhcbiAgICAgIGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLmJvYXJkLFxuICAgICAgb3Bwb25lbnQuYWlHYW1lQm9hcmQuYm9hcmRcbiAgICApO1xuICAgIGlmIChcbiAgICAgIGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpIHx8XG4gICAgICBvcHBvbmVudC5haUdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKVxuICAgICkge1xuICAgICAgZW5kR2FtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50UGxheWVyID0gb3Bwb25lbnQ7XG4gICAgICBvcHBvbmVudCA9IGN1cnJlbnRQbGF5ZXI7XG4gICAgICBwbGF5VHVybigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVBdHRhY2tMaXN0ZW5lcnMgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29vcmRpbmF0ZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQXR0YWNrKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBzdGFydEdhbWUgfTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHg6IHggKyBpLCB5IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeCwgeTogeSArIGkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtpXS5zaGlwO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBib2FyZFtpXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzW2pdLnggPT09IHggJiYgY29vcmRpbmF0ZXNbal0ueSA9PT0geSkge1xuICAgICAgICAgIHNoaXAuaGl0KGopO1xuICAgICAgICAgIGFscmVhZHlBdHRhY2tlZC5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc2VkU2hvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWJvYXJkW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmQXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxyZWFkeUF0dGFja2VkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxyZWFkeUF0dGFja2VkW2ldLnggPT09IHggJiYgYWxyZWFkeUF0dGFja2VkW2ldLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgICBjaGVja0lmQXR0YWNrZWQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFja0FJID0gKHgsIHksIG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAob3Bwc0dhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Bwc0dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJHYW1lQm9hcmQsIGF0dGFja0FJIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWkgPSAoKSA9PiB7XG4gIGNvbnN0IGFpR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gKG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgaWYgKG9wcHNHYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICBhdHRhY2sob3Bwc0dhbWVCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wcHNHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWlHYW1lQm9hcmQsIGF0dGFjayB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBoaXRBcnJheSA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcbiAgICBoaXRBcnJheVtwb3NpdGlvbl0gPSB0cnVlO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRBcnJheS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSB0cnVlKTtcbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRBcnJheSwgaGl0LCBpc1N1bmsgfTtcbn07XG4iLCJpbXBvcnQgXCIuLi9zcmMvZG9tL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lL2dhbWVMb29wLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXJCb2FyZHMsIHJlbmRlck1lc3NhZ2UsIHJlbmRlckdhbWVPdmVyIH0gZnJvbSAnLi4vc3JjL2RvbS9kb20uanMnO1xuXG5jb25zdCBpbmlhdGlhbFBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImNvbnRhaW5lclwiLCBcIlwiKTtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBcInRpdGxlXCIsIFwiXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIFwic3RhcnQtYnV0dG9uXCIsIFwiXCIpO1xuICAgIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICBcImJvYXJkcy1jb250YWluZXJcIixcbiAgICAgICAgXCJib2FyZHMtY29udGFpbmVyXCJcbiAgICAgICk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChib2FyZHNDb250YWluZXIpO1xuICAgIFxuICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgZ2FtZUxvb3Auc3RhcnRHYW1lKCk7XG4gICAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbmlhdGlhbFBhZ2UpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbn1cblxuKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbn1cblxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG59XG5cbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5ib2R5IHtcbiAgbGluZS1oZWlnaHQ6IDEuNmVtO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cblxuLmJvYXJkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiA0MTBweDtcbiAgaGVpZ2h0OiA0MTBweDtcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uY2VsbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcbiAgfVxufVxuXG4uYm9hcmRzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGdhcDogMnJlbTtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvZG9tL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtBQUNBOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsU0FBUztFQUNULFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7O0VBRVo7SUFDRSxzQkFBc0I7RUFDeEI7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbn1cXG5cXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxufVxcblxcbmh0bWwge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjZlbTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHdpZHRoOiA0MTBweDtcXG4gIGhlaWdodDogNDEwcHg7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcblxcbiAgJjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxuICB9XFxufVxcblxcbi5ib2FyZHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBnYXA6IDJyZW07XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsImVsZW1lbnQiLCJjbGFzc05hbWUiLCJpZCIsIm5ld0VsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZTEweDEwYm9hcmQiLCJwbGF5ZXIiLCJib2FyZCIsImkiLCJyb3ciLCJhcHBlbmRDaGlsZCIsImoiLCJjZWxsIiwic2V0QXR0cmlidXRlIiwiYm9hcmRzQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXJNZXNzYWdlIiwibWVzc2FnZSIsIm1lc3NhZ2VDb250YWluZXIiLCJtZXNzYWdlRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9keSIsInNoaXAiLCJhaSIsImdhbWVMb29wIiwiY3VycmVudFBsYXllciIsIm9wcG9uZW50Iiwic3RhcnRHYW1lIiwicGxheWVyR2FtZUJvYXJkIiwicGxhY2VTaGlwIiwiYWlHYW1lQm9hcmQiLCJwbGF5VHVybiIsImFkZEF0dGFja0xpc3RlbmVycyIsInNldFRpbWVvdXQiLCJhdHRhY2siLCJyZW5kZXJCb2FyZHMiLCJhbGxTaGlwc1N1bmsiLCJlbmRHYW1lIiwicmVuZGVyR2FtZU92ZXIiLCJyZW1vdmVBdHRhY2tMaXN0ZW5lcnMiLCJnYW1lQm9hcmQiLCJjb29yZGluYXRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiY29vcmRpbmF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVBdHRhY2siLCJlIiwieCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInkiLCJhdHRhY2tBSSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtaXNzZWRTaG90cyIsImFscmVhZHlBdHRhY2tlZCIsImRpcmVjdGlvbiIsImxlbmd0aCIsInB1c2giLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiaXNTdW5rIiwiY2hlY2tJZkF0dGFja2VkIiwib3Bwc0dhbWVCb2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImhpdEFycmF5IiwiQXJyYXkiLCJmaWxsIiwicG9zaXRpb24iLCJldmVyeSIsImluaWF0aWFsUGFnZSIsImNvbnRhaW5lciIsInRpdGxlIiwic3RhcnRCdXR0b24iLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9