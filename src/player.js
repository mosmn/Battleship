export const player = () => {
    const gameBoard = gameBoard();
    
    const attack = (x, y) => {
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            return;
        } else {
            gameBoard.receiveAttack(x, y);
        }
    };
    
    return { gameBoard, attack };
}

module.exports = player;