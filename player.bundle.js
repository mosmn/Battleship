"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["player"],{

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
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

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ai: () => (/* binding */ ai),
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");

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

// module.exports = { player, ai };

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/player.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEMsSUFBSU4sYUFBYSxDQUFDSixlQUFlLENBQUNaLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUU7TUFDdkNrQixNQUFNLENBQUNILGFBQWEsQ0FBQztJQUN2QixDQUFDLE1BQU07TUFDTEEsYUFBYSxDQUFDVCxhQUFhLENBQUNQLENBQUMsRUFBRUMsQ0FBQyxDQUFDO0lBQ25DO0VBQ0YsQ0FBQztFQUVELE9BQU87SUFBRWlCLFdBQVc7SUFBRUM7RUFBTyxDQUFDO0FBQ2hDLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHg6IHggKyBpLCB5IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeCwgeTogeSArIGkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtpXS5zaGlwO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBib2FyZFtpXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzW2pdLnggPT09IHggJiYgY29vcmRpbmF0ZXNbal0ueSA9PT0geSkge1xuICAgICAgICAgIHNoaXAuaGl0KGopO1xuICAgICAgICAgIGFscmVhZHlBdHRhY2tlZC5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc2VkU2hvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWJvYXJkW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmQXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxyZWFkeUF0dGFja2VkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxyZWFkeUF0dGFja2VkW2ldLnggPT09IHggJiYgYWxyZWFkeUF0dGFja2VkW2ldLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgICBjaGVja0lmQXR0YWNrZWQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHtnYW1lQm9hcmR9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuXG5leHBvcnQgY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBnYW1lQm9hcmQoKTtcblxuICBjb25zdCBhdHRhY2tBSSA9ICh4LCB5LCBvcHBzR2FtZUJvYXJkKSA9PiB7XG4gICAgaWYgKG9wcHNHYW1lQm9hcmQuY2hlY2tJZkF0dGFja2VkKHgsIHkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wcHNHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyR2FtZUJvYXJkLCBhdHRhY2tBSSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGFpID0gKCkgPT4ge1xuICBjb25zdCBhaUdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFjayA9IChvcHBzR2FtZUJvYXJkKSA9PiB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGlmIChvcHBzR2FtZUJvYXJkLmNoZWNrSWZBdHRhY2tlZCh4LCB5KSkge1xuICAgICAgYXR0YWNrKG9wcHNHYW1lQm9hcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHBzR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGFpR2FtZUJvYXJkLCBhdHRhY2sgfTtcbn07XG5cbi8vIG1vZHVsZS5leHBvcnRzID0geyBwbGF5ZXIsIGFpIH07XG4iXSwibmFtZXMiOlsiZ2FtZUJvYXJkIiwiYm9hcmQiLCJtaXNzZWRTaG90cyIsImFscmVhZHlBdHRhY2tlZCIsInBsYWNlU2hpcCIsInNoaXAiLCJ4IiwieSIsImRpcmVjdGlvbiIsImNvb3JkaW5hdGVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJyZWNlaXZlQXR0YWNrIiwiaiIsImhpdCIsImFsbFNoaXBzU3VuayIsImlzU3VuayIsImNoZWNrSWZBdHRhY2tlZCIsInBsYXllciIsInBsYXllckdhbWVCb2FyZCIsImF0dGFja0FJIiwib3Bwc0dhbWVCb2FyZCIsImFpIiwiYWlHYW1lQm9hcmQiLCJhdHRhY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iXSwic291cmNlUm9vdCI6IiJ9