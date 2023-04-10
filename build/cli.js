"use strict";
// Reads command line inputs, creates world grid, updates the robots, and prints out the final states of the robots.
// - User starts the app
// - Responds to the prompt for world grid dimension input which need to be provided in a `x-axis y-axis` format, e.g. `4 8`
// - Responds to the prompts for robot inputs which need to be provided in a `(x-start, y-start, orientation-start) {COMMANDS}` format with `{COMMANDS}` being a series of the following commands:
//   - `F`: move forward one space
//   - `L`: rotate left by 90 degrees
//   - `R`: rotate right by 90 degrees
// - Closes the app and the outputs for each robot created will be printed out in a `{(x-position, y-position, orientation) status?}`, e.g. `{(1, 0, S) LOST}` or `{(5, 2, W)}`
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src\cli.ts
var index_1 = require("./index");
var readline_1 = __importDefault(require("readline"));
var marsMissionSimulator = new index_1.MarsMissionSimulator();
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Please provide the world grid dimensions: ', function (worldGridDimensions) {
    var _a = worldGridDimensions.split(' ').map(function (dimension) { return parseInt(dimension); }), x = _a[0], y = _a[1];
    marsMissionSimulator.createWorldGrid(x, y);
    rl.question('Please provide a robot starting position and commands or close: ', function (robotInput) {
        var _a = robotInput.split(' '), startingPosition = _a[0], commands = _a[1];
        var _b = startingPosition.split(',').map(function (dimension) { return dimension.trim(); }), x = _b[0], y = _b[1], orientation = _b[2];
        marsMissionSimulator.createRobot(parseInt(x), parseInt(y), orientation, commands);
        rl.close();
    });
});
rl.on('close', function () {
    marsMissionSimulator.runSimulation();
    process.exit(0);
});
