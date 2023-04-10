import readline from 'readline';

export class WorldGrid {
  constructor(public m: number, public n: number) {
    this.m = m;
    this.n = n;
  }
}

export class Robot {
  isLost: boolean;
  commands: string;
  constructor(
    public x: number,
    public y: number,
    public orientation: string,
    public worldGrid: WorldGrid,
    commands: string,
  ) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.worldGrid = worldGrid;
    this.commands = commands;
    this.isLost = false;
  }

  moveForward() {
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
  }

  rotateLeft() {
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
  }

  rotateRight() {
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
  }
}

export class MarsMissionSimulator {
  robots: Robot[];
  worldGrid?: WorldGrid;
  statusReports: string[] = [];

  constructor() {
    this.robots = [];
  }

  processRobot(robot: Robot) {
    for (let i = 0; i < robot.commands.length; i++) {
      const command = robot.commands[i];
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
  }

  generateRobotStatusReport(robot: Robot) {
    const state = robot.isLost ? ' LOST' : '';
    this.statusReports.push(
      `(${robot.x}, ${robot.y}, ${robot.orientation})${state}`,
    );
  }

  createWorldGrid(x: number, y: number) {
    this.worldGrid = new WorldGrid(x, y);
  }

  createRobot(x: number, y: number, orientation: string, commands: string) {
    if (this.worldGrid) {
      const robot = new Robot(x, y, orientation, this.worldGrid, commands);
      this.robots.push(robot);
    }
  }

  runSimulation() {
    this.robots.forEach((robot) => {
      this.processRobot(robot);
      this.generateRobotStatusReport(robot);
    });

    this.statusReports.forEach((statusReport) => {
      // eslint-disable-next-line no-console
      console.log(statusReport);
    });
  }
}

const marsMissionSimulator = new MarsMissionSimulator();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let worldGridDimensions: string[] = [];
let robotInput: string[] = [];
let robotString = '';

rl.question(
  'Enter the world dimensions then enter robot inputs: ',
  (response) => {
    worldGridDimensions = response.split(' ');
    marsMissionSimulator.createWorldGrid(
      parseInt(worldGridDimensions[0]),
      parseInt(worldGridDimensions[1]),
    );

    rl.on('line', (line) => {
      if (line.toLowerCase() === 'end' || line === '') {
        rl.close();
        return;
      }

      robotString = line.replace('(', '').replace(')', ',');
      robotInput = robotString.split(',');
      marsMissionSimulator.createRobot(
        parseInt(robotInput[0]),
        parseInt(robotInput[1]),
        robotInput[2].trim(),
        robotInput[3].trim(),
      );
    });
  },
);

rl.on('close', () => {
  marsMissionSimulator.runSimulation();
});
