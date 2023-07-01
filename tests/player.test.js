import { player, ai } from "../src/game/player.js";

let testPlayer;
let AIPlayer;

beforeAll(() => {
  testPlayer = player();
  AIPlayer = ai();
});

test("Check if player and AI are objects", () => {
  expect(typeof testPlayer).toBe("object");
  expect(typeof AIPlayer).toBe("object");
});

test("Player attacks AI", () => {
  testPlayer.attackAI(0, 0, AIPlayer.aiGameBoard);
  expect(AIPlayer.aiGameBoard.missedShots).toMatchObject([{ x: 0, y: 0 }]);
});

test("AI attacks player", () => {
  AIPlayer.attack(testPlayer.playerGameBoard);
  expect(testPlayer.playerGameBoard.missedShots).not.toMatchObject([]);
});
