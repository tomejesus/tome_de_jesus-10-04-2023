"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsMissionSimulator = exports.Robot = exports.WorldGrid = void 0;
var readline_1 = __importDefault(require("readline"));
var WorldGrid = /** @class */ (function () {
    function WorldGrid(m, n) {
        this.m = m;
        this.n = n;
        this.m = m;
        this.n = n;
    }
    return WorldGrid;
}());
exports.WorldGrid = WorldGrid;
var Robot = /** @class */ (function () {
    function Robot(x, y, orientation, worldGrid, commands) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.worldGrid = worldGrid;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.worldGrid = worldGrid;
        this.commands = commands;
        this.isLost = false;
    }
    Robot.prototype.moveForward = function () {
        if (this.isLost) {
            return;
        }
        switch (this.orientation) {
            case 'N':
                if (this.y + 1 > this.worldGrid.n) {
                    this.isLost = true;
                    return;
                }
                this.y++;
                break;
            case 'E':
                if (this.x + 1 > this.worldGrid.m) {
                    this.isLost = true;
                    return;
                }
                this.x++;
                break;
            case 'S':
                if (this.y - 1 < 0) {
                    this.isLost = true;
                    return;
                }
                this.y--;
                break;
            case 'W':
                if (this.x - 1 < 0) {
                    this.isLost = true;
                    return;
                }
                this.x--;
                break;
            default:
                break;
        }
    };
    Robot.prototype.rotateLeft = function () {
        if (this.isLost) {
            return;
        }
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W';
                break;
            case 'E':
                this.orientation = 'N';
                break;
            case 'S':
                this.orientation = 'E';
                break;
            case 'W':
                this.orientation = 'S';
                break;
            default:
                break;
        }
    };
    Robot.prototype.rotateRight = function () {
        if (this.isLost) {
            return;
        }
        switch (this.orientation) {
            case 'N':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'W';
                break;
            case 'W':
                this.orientation = 'N';
                break;
            default:
                break;
        }
    };
    return Robot;
}());
exports.Robot = Robot;
var MarsMissionSimulator = /** @class */ (function () {
    function MarsMissionSimulator() {
        this.statusReports = [];
        this.robots = [];
    }
    MarsMissionSimulator.prototype.processRobot = function (robot) {
        for (var i = 0; i < robot.commands.length; i++) {
            var command = robot.commands[i];
            switch (command) {
                case 'F':
                    robot.moveForward();
                    break;
                case 'L':
                    robot.rotateLeft();
                    break;
                case 'R':
                    robot.rotateRight();
                    break;
                default:
                    break;
            }
        }
    };
    MarsMissionSimulator.prototype.generateRobotStatusReport = function (robot) {
        var state = robot.isLost ? ' LOST' : '';
        this.statusReports.push("(".concat(robot.x, ", ").concat(robot.y, ", ").concat(robot.orientation, ")").concat(state));
    };
    MarsMissionSimulator.prototype.createWorldGrid = function (x, y) {
        this.worldGrid = new WorldGrid(x, y);
    };
    MarsMissionSimulator.prototype.createRobot = function (x, y, orientation, commands) {
        if (this.worldGrid) {
            var robot = new Robot(x, y, orientation, this.worldGrid, commands);
            this.robots.push(robot);
        }
    };
    MarsMissionSimulator.prototype.runSimulation = function () {
        var _this = this;
        this.robots.forEach(function (robot) {
            _this.processRobot(robot);
            _this.generateRobotStatusReport(robot);
        });
        this.statusReports.forEach(function (statusReport) {
            console.log(statusReport);
        });
    };
    return MarsMissionSimulator;
}());
exports.MarsMissionSimulator = MarsMissionSimulator;
var marsMissionSimulator = new MarsMissionSimulator();
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var lineCount = 0;
var worldGridDimensions = [];
var robotInput = [];
var robotString = '';
rl.question('Enter the world dimensions then enter robot inputs: ', function (response) {
    worldGridDimensions = response.split(' ');
    marsMissionSimulator.createWorldGrid(parseInt(worldGridDimensions[0]), parseInt(worldGridDimensions[1]));
    rl.on('line', function (line) {
        if (line.toLowerCase() === 'end' || line === '') {
            rl.close();
            return;
        }
        robotString = line.replace('(', '').replace(')', ',');
        robotInput = robotString.split(',');
        marsMissionSimulator.createRobot(parseInt(robotInput[0]), parseInt(robotInput[1]), robotInput[2].trim(), robotInput[3].trim());
        lineCount++;
    });
});
rl.on('close', function () {
    marsMissionSimulator.runSimulation();
});
