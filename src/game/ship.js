export const ship = (length) => {
  const hitArray = new Array(length).fill(false);
  const hit = (position) => {
    hitArray[position] = true;
  };
  const isSunk = () => hitArray.every((position) => position === true);
  return { length, hitArray, hit, isSunk };
};
