const { player } = require('../src/player');
const { ai } = require('../src/player');

let testPlayer;
let AIPlayer;

beforeAll(() => {
    testPlayer = player();
    AIPlayer = ai();
});

test('player returns an object', () => {
    expect(typeof testPlayer).toBe('object');
});

test('Player attacks AI', () => {
    testPlayer.attackAI(0, 0, AIPlayer.aiGameBoard);
    expect(AIPlayer.aiGameBoard.missedShots).toMatchObject([{ x: 0, y: 0 }]);
});

test('AI attacks player', () => {
    AIPlayer.attack(testPlayer.playerGameBoard);
    expect(testPlayer.playerGameBoard.missedShots).not.toMatchObject([]);
});