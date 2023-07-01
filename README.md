# Battleship

The Battleship project is a web-based implementation of the classic game 'Battleship'. It allows players to play against the computer by taking turns attacking each other's fleets of ships. The objective is to sink all the opponent's ships before they sink yours. The game features a game board where ships can be placed, and players can strategically attack the opponent's board to find and sink their ships.

## Live Demo

A live demo of the Battleship project can be found [here](https://your-github-username.github.io/battleship/).

## Screenshots

## Game Rules

1. The game is played on a grid-based board. Each player has their own board to place their ships and track their opponent's attacks.
2. At the beginning of the game, each player places their ships on their own board. Ships can be placed horizontally or vertically.
3. Players take turns attacking the opponent's board by calling out coordinates.
4. If the attack hits a ship, it is marked as a hit. If it misses, it is marked as a miss.
5. Players continue taking turns until all the ships of one player have been sunk.
6. The player who sinks all the opponent's ships first wins the game.

## Technologies Used

The Battleship project utilizes the following technologies:

- HTML: For creating the structure and layout of the game interface.
- CSS: For styling the game interface and providing a visually appealing experience.
- JavaScript: For implementing the game logic and interaction.
- DOM Manipulation: To dynamically update the game board and handle user interactions.
- Event Handling: To capture and respond to user actions such as clicking and hovering.
- Randomization: To create a computer player capable of making random legal moves.

## Project Structure

The Battleship project follows a modular structure to separate different components and functionalities. The key components of the project include:

- Ship Factory: Creates ship objects with properties such as length, hits, and sunk status.
- Gameboard Factory: Creates game board objects responsible for placing ships, tracking attacks, and checking for game completion.
- Player: Represents a player in the game and handles turn-based gameplay.
- Game Loop: Implements the main game loop and controls the flow of the game.
- DOM Interaction: Handles interaction with the HTML document to display the game board, update UI elements, and capture user input.

## Testing

The Battleship project follows a Test Driven Development (TDD) approach, which means that unit tests are written before implementing the corresponding code. Tests ensure that the implemented functions and modules work correctly and meet the expected behavior. The project includes a comprehensive suite of tests covering various aspects of the game logic and functionalities.

To run the tests, clone the project repository and run the following command in the project directory:

```
npm test
```

## Development Process

The development of the Battleship project involves the following steps:

1. Ship Factory: Implement the Ship factory function to create ship objects with the necessary properties and methods. Write tests for each functionality and ensure they pass.
2. Gameboard Factory: Implement the Gameboard factory function to create game board objects. Add functions to place ships, track attacks, and check for game completion. Write tests to verify the correctness of each functionality.
3. Player: Create the Player object to represent a player in the game. Implement functions to handle turn-based gameplay, including attacking the opponent's board. Write tests to validate the player's actions and interactions.
4. Game Loop: Develop the main game loop that controls

the flow of the game. Incorporate the Player and Gameboard objects to enable the game to progress with each turn. Add conditions to determine the end of the game. Test the game loop thoroughly to ensure smooth gameplay. 5. DOM Interaction: Implement the necessary functions to interact with the DOM and display the game board, update UI elements, and capture user input. Connect the game logic with the HTML document to create a functional user interface. 6. Testing and Refactoring: Continuously run tests and refactor the code as needed to improve performance, maintainability, and adherence to best practices. Ensure all tests pass before finalizing the project.

## Future Enhancements

The Battleship project can be further enhanced with the following features:

- Ship Placement: Allow players to manually place their ships on the board instead of predetermined coordinates. Implement drag and drop functionality for a more interactive ship placement experience.
- Intelligent Computer Player: Improve the computer player's AI to make smarter moves, such as targeting adjacent slots after getting a hit, to provide a more challenging gameplay experience.
- Two-Player Option: Implement a two-player mode that allows users to take turns playing on the same device. Include a "pass device" screen to prevent players from seeing each other's boards.
- Styling and UI Enhancements: Enhance the visual design of the game interface, add animations, and improve the overall user experience.

## Author

The Battleship project is created by [Your Name].
