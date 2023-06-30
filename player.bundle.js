"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["player"],{

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard = () => {
  const board = [];
  const missedShots = [];
  const alreadyAttacked = [];

  const placeShip = (ship, x, y, direction) => {
    const coordinates = [];

    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x: x + i, y });
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        coordinates.push({ x, y: y + i });
      }
    }

    board.push({ ship, coordinates });
  };

  const receiveAttack = (x, y) => {
    for (let i = 0; i < board.length; i++) {
      const ship = board[i].ship;
      const coordinates = board[i].coordinates;
      for (let j = 0; j < coordinates.length; j++) {
        if (coordinates[j].x === x && coordinates[j].y === y) {
          ship.hit(j);
          alreadyAttacked.push({ x, y });
          return;
        }
      }
    }
    missedShots.push({ x, y });
    alreadyAttacked.push({ x, y });
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
    checkIfAttacked,
  };
});

module.exports = gameBoard;


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ai: () => (/* binding */ ai),
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* module decorator */ module = __webpack_require__.hmd(module);


const player = () => {
  const playerGameBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const attackAI = (x, y, oppsGameBoard) => {
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      return;
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };

  return { playerGameBoard, attackAI };
};

const ai = () => {
  const aiGameBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const attack = (oppsGameBoard) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (oppsGameBoard.checkIfAttacked(x, y)) {
      attack(oppsGameBoard);
    } else {
      oppsGameBoard.receiveAttack(x, y);
    }
  };

  return { aiGameBoard, attack };
};

module.exports = { player, ai };


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/player.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDLDJCQUEyQixhQUFhO0FBQ3hDO0FBQ0EsTUFBTTtBQUNOLHNCQUFzQixpQkFBaUI7QUFDdkMsMkJBQTJCLGFBQWE7QUFDeEM7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDOztBQUVBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5QztBQUNBO0FBQ0EsaUNBQWlDLE1BQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsTUFBTTtBQUM3QiwyQkFBMkIsTUFBTTtBQUNqQzs7QUFFQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakV1Qzs7QUFFaEM7QUFDUCwwQkFBMEIseURBQVM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVPO0FBQ1Asc0JBQXNCLHlEQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUEsbUJBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHg6IHggKyBpLCB5IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeCwgeTogeSArIGkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtpXS5zaGlwO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBib2FyZFtpXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzW2pdLnggPT09IHggJiYgY29vcmRpbmF0ZXNbal0ueSA9PT0geSkge1xuICAgICAgICAgIHNoaXAuaGl0KGopO1xuICAgICAgICAgIGFscmVhZHlBdHRhY2tlZC5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc2VkU2hvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWJvYXJkW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmQXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxyZWFkeUF0dGFja2VkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxyZWFkeUF0dGFja2VkW2ldLnggPT09IHggJiYgYWxyZWFkeUF0dGFja2VkW2ldLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgICBjaGVja0lmQXR0YWNrZWQsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdhbWVCb2FyZDtcbiIsImltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFja0FJID0gKHgsIHksIG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBpZiAob3Bwc0dhbWVCb2FyZC5jaGVja0lmQXR0YWNrZWQoeCwgeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Bwc0dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJHYW1lQm9hcmQsIGF0dGFja0FJIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWkgPSAoKSA9PiB7XG4gIGNvbnN0IGFpR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gKG9wcHNHYW1lQm9hcmQpID0+IHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgaWYgKG9wcHNHYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICBhdHRhY2sob3Bwc0dhbWVCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wcHNHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYWlHYW1lQm9hcmQsIGF0dGFjayB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHBsYXllciwgYWkgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==