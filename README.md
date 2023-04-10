# MARS ROVER APP | 10-04-2023

### Features

- Reads command line inputs, creates world grid, updates the robots, and prints out the final states of the robots.
- World is modelled as a grid with size m x n.
- Each robot has a position (x, y), and an orientation (N, E, S, W).
- Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R).
- If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.
- (0, 0) represents the south-west corner of the grid.

### Technology
- TypeScript Node.js
- Testing with Jest
- Linting with Eslint and Prettier

### Instructions

#### `yarn start`

- Starts the app
- Respond to the prompt: 
  - Enter a world grid dimension input which needs to be provided in a `x-axis y-axis` format, e.g. `4 8`
  - Enter robot inputs which need to be provided in a `(x-start, y-start, orientation-start) {COMMANDS}` format with `{COMMANDS}` being a series of the following commands:
    - `F`: move forward one space
    - `L`: rotate left by 90 degrees
    - `R`: rotate right by 90 degrees
- Close the app by entering an empty line (or 'end') and the outputs for each robot created will be printed out in a `{(x-position, y-position, orientation) status?}`, e.g. `{(1, 0, S) LOST}` or `{(5, 2, W)}`

#### `yarn test`

- Will run the tests.

### Notes
I took an OOP and TDD approach and I'm happy with the result but there are a few things I would have done if I had more time:
  1. I have roughly added the CLI logic at the bottom of the index.ts file, I would prefer to have this be a tested class in itself;
  2. Everything is in one file, extracting each class into it's own module would be more ideal;
  3. I have a repeated check for lost status in each command function, this check should be done in the `processRobot` function before the commands are called;
  4. I print from the simulator class and ideally this should be done in the CLI class I mention above and be tested; 
  5. I have no error handling so if the inputs aren't well formed the app still runs and returns invalids results like `NaN` and `undefined`, so it would be good to have some validation on the CLI inputs with retry prompts;
  6. My code is linear and vulnerable to race conditions, it would be good to add in some concurrency to allow for things to be done asynchronously - this should help to fix the `Jest did not exit one second after the test run has completed.` that appears after the tests run;
  7. Finally, I store all objects in memory until processing them at the end. It might be more efficient to process each robot on the fly and cache the string outputs and remove the objects from memory.
