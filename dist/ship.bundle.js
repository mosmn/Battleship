"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["ship"],{

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ship.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU1BLElBQUksR0FBSUMsTUFBTSxJQUFLO0VBQzlCLE1BQU1DLFFBQVEsR0FBRyxJQUFJQyxLQUFLLENBQUNGLE1BQU0sQ0FBQyxDQUFDRyxJQUFJLENBQUMsS0FBSyxDQUFDO0VBQzlDLE1BQU1DLEdBQUcsR0FBSUMsUUFBUSxJQUFLO0lBQ3hCSixRQUFRLENBQUNJLFFBQVEsQ0FBQyxHQUFHLElBQUk7RUFDM0IsQ0FBQztFQUNELE1BQU1DLE1BQU0sR0FBR0EsQ0FBQSxLQUFNTCxRQUFRLENBQUNNLEtBQUssQ0FBRUYsUUFBUSxJQUFLQSxRQUFRLEtBQUssSUFBSSxDQUFDO0VBQ3BFLE9BQU87SUFBRUwsTUFBTTtJQUFFQyxRQUFRO0lBQUVHLEdBQUc7SUFBRUU7RUFBTyxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGhpdEFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XG4gIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xuICAgIGhpdEFycmF5W3Bvc2l0aW9uXSA9IHRydWU7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdEFycmF5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09IHRydWUpO1xuICByZXR1cm4geyBsZW5ndGgsIGhpdEFycmF5LCBoaXQsIGlzU3VuayB9O1xufTsiXSwibmFtZXMiOlsic2hpcCIsImxlbmd0aCIsImhpdEFycmF5IiwiQXJyYXkiLCJmaWxsIiwiaGl0IiwicG9zaXRpb24iLCJpc1N1bmsiLCJldmVyeSJdLCJzb3VyY2VSb290IjoiIn0=