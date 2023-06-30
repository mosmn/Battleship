"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameboard"],{

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameboard.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBR1AsZUFBZSxDQUFDUSxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQy9DLElBQUlQLGVBQWUsQ0FBQ08sQ0FBQyxDQUFDLENBQUNKLENBQUMsS0FBS0EsQ0FBQyxJQUFJSCxlQUFlLENBQUNPLENBQUMsQ0FBQyxDQUFDSCxDQUFDLEtBQUtBLENBQUMsRUFBRTtRQUM1RCxPQUFPLElBQUk7TUFDYjtJQUNGO0lBQ0EsT0FBTyxLQUFLO0VBQ2QsQ0FBQztFQUVELE9BQU87SUFDTE4sS0FBSztJQUNMQyxXQUFXO0lBQ1hFLFNBQVM7SUFDVFMsYUFBYTtJQUNiRyxZQUFZO0lBQ1pFO0VBQ0YsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh7IHg6IHggKyBpLCB5IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHsgeCwgeTogeSArIGkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9hcmQucHVzaCh7IHNoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFtpXS5zaGlwO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBib2FyZFtpXS5jb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGVzW2pdLnggPT09IHggJiYgY29vcmRpbmF0ZXNbal0ueSA9PT0geSkge1xuICAgICAgICAgIHNoaXAuaGl0KGopO1xuICAgICAgICAgIGFscmVhZHlBdHRhY2tlZC5wdXNoKHsgeCwgeSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWlzc2VkU2hvdHMucHVzaCh7IHgsIHkgfSk7XG4gICAgYWxyZWFkeUF0dGFja2VkLnB1c2goeyB4LCB5IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWJvYXJkW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0lmQXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxyZWFkeUF0dGFja2VkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxyZWFkeUF0dGFja2VkW2ldLnggPT09IHggJiYgYWxyZWFkeUF0dGFja2VkW2ldLnkgPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzU3VuayxcbiAgICBjaGVja0lmQXR0YWNrZWQsXG4gIH07XG59O1xuIl0sIm5hbWVzIjpbImdhbWVCb2FyZCIsImJvYXJkIiwibWlzc2VkU2hvdHMiLCJhbHJlYWR5QXR0YWNrZWQiLCJwbGFjZVNoaXAiLCJzaGlwIiwieCIsInkiLCJkaXJlY3Rpb24iLCJjb29yZGluYXRlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImoiLCJoaXQiLCJhbGxTaGlwc1N1bmsiLCJpc1N1bmsiLCJjaGVja0lmQXR0YWNrZWQiXSwic291cmNlUm9vdCI6IiJ9