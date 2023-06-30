
import {ship} from "./ship";
import { player, ai } from "./player.js";

export const gameLoop = () => {
    const human = player();
    const computer = ai();

    const humanShips = [
        ship(5),
        ship(4),
        ship(3),
        ship(2)
    ];

    const computerShips = [
        ship(5),
        ship(4),
        ship(3),
        ship(2)
    ];

    human.playerGameBoard.placeShip(humanShips[0], 0, 0, "horizontal");
    human.playerGameBoard.placeShip(humanShips[1], 6, 0, "vertical");
    human.playerGameBoard.placeShip(humanShips[2], 0, 2, "horizontal");
    human.playerGameBoard.placeShip(humanShips[3], 4, 4, "vertical");

    computer.aiGameBoard.placeShip(computerShips[0], 0, 0, "horizontal");
    computer.aiGameBoard.placeShip(computerShips[1], 6, 0, "vertical");
    computer.aiGameBoard.placeShip(computerShips[2], 0, 2, "horizontal");
    computer.aiGameBoard.placeShip(computerShips[3], 4, 4, "vertical");

    console.log(human.playerGameBoard.board);
    console.log(computer.aiGameBoard.board);


}

// gameLoop();


    

