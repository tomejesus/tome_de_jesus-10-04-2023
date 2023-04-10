# MARS ROVER APP | 10-04-2023

### Features

- Reads command line inputs, creates world grid, updates the robots, and prints out the final states of the robots.
- World is modelled as a grid with size m x n.
- Each robot has a position (x, y), and an orientation (N, E, S, W).
- Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R).
- If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.
- (0, 0) represents the south-west corner of the grid.

### Technology
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier

### Instructions

#### `yarn start`

- Starts the app
- Respond to the prompt for world grid dimension input which need to be provided in a `x-axis y-axis` format, e.g. `4 8`
- Respond to the prompts for robot inputs which need to be provided in a `(x-start, y-start, orientation-start) {COMMANDS}` format with `{COMMANDS}` being a series of the following commands:
  - `F`: move forward one space
  - `L`: rotate left by 90 degrees
  - `R`: rotate right by 90 degrees
- Close the app and the outputs for each robot created will be printed out

#### `yarn test`

Will run the tests.
