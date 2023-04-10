import { WorldGrid, Robot, MarsMissionSimulator } from './index';

describe('WorldGrid', () => {
  test('WorldGrid is modelled as a grid with size m x n.', () => {
    const worldGrid = new WorldGrid(5, 3);
    expect(worldGrid).toBeInstanceOf(WorldGrid);
    expect(worldGrid.m).toBe(5);
    expect(worldGrid.n).toBe(3);
  });
});

describe('Robot', () => {
  const worldGrid = new WorldGrid(5, 3);
  const commands = 'FRFRF';

  test('Robot has a position (x, y), and an orientation (N, E, S, W).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    expect(robot).toBeInstanceOf(Robot);
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(1);
    expect(robot.orientation).toBe('E');
  });

  test('Robot can move forward one space (F).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    robot.moveForward();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
    expect(robot.orientation).toBe('E');
  });

  test('Robot can rotate left by 90 degrees (L).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    robot.rotateLeft();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(1);
    expect(robot.orientation).toBe('N');
  });

  test('Robot can rotate right by 90 degrees (R).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    robot.rotateRight();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(1);
    expect(robot.orientation).toBe('S');
  });

  test('If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.', () => {
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    robot.moveForward();
    robot.moveForward();
    robot.moveForward();
    robot.moveForward();
    robot.moveForward();
    expect(robot.x).toBe(5);
    expect(robot.y).toBe(1);
    expect(robot.orientation).toBe('E');
    expect(robot.isLost).toBe(true);
  });
});

describe('MarsMissionSimulator', () => {
  const worldGrid = new WorldGrid(4, 8);
  const commands = 'LFRFF';

  test('MarsMissionSimulator can take a string of instructions and execute them on a robot.', () => {
    const missionSimulator = new MarsMissionSimulator();
    const robot = new Robot(2, 3, 'E', worldGrid, commands);
    missionSimulator.processRobot(robot);
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(4);
    expect(robot.orientation).toBe('E');
  });

  test('MarsMissionSimulator can generate a robots status report.', () => {
    const missionSimulator = new MarsMissionSimulator();
    const robot = new Robot(1, 1, 'E', worldGrid, commands);
    missionSimulator.generateRobotStatusReport(robot);
    expect(missionSimulator.statusReports[0]).toBe('(1, 1, E)');
  });

  test('MarsMissionSimulator can generate a robots status report if it is lost.', () => {
    const missionSimulator = new MarsMissionSimulator();
    const robot = new Robot(0, 0, 'E', worldGrid, 'RF');
    missionSimulator.processRobot(robot);
    missionSimulator.generateRobotStatusReport(robot);
    expect(missionSimulator.statusReports[0]).toBe('(0, 0, S) LOST');
  });

  test('MarsMissionSimulator can  and store a world grid.', () => {
    const missionSimulator = new MarsMissionSimulator();
    missionSimulator.createWorldGrid(4, 8);
    expect(missionSimulator.worldGrid).toBeInstanceOf(WorldGrid);
    expect(missionSimulator.worldGrid?.m).toBe(4);
    expect(missionSimulator.worldGrid?.n).toBe(8);
  });

  test('MarsMissionSimulator can create and store robot.', () => {
    const missionSimulator = new MarsMissionSimulator();
    missionSimulator.createWorldGrid(4, 8);
    missionSimulator.createRobot(1, 1, 'E', commands);
    expect(missionSimulator.robots[0]).toBeInstanceOf(Robot);
    expect(missionSimulator.robots[0].x).toBe(1);
    expect(missionSimulator.robots[0].y).toBe(1);
    expect(missionSimulator.robots[0].orientation).toBe('E');
    expect(missionSimulator.robots[0].commands).toBe(commands);
  });

  test('MarsMissionSimulator can run a simulation with a single robot.', () => {
    const missionSimulator = new MarsMissionSimulator();
    missionSimulator.createWorldGrid(4, 8);
    missionSimulator.createRobot(2, 3, 'E', commands);
    missionSimulator.runSimulation();
    expect(missionSimulator.robots[0].x).toBe(4);
    expect(missionSimulator.robots[0].y).toBe(4);
    expect(missionSimulator.robots[0].orientation).toBe('E');
  });

  test('MarsMissionSimulator can run a simulation with multiple robots.', () => {
    const missionSimulator = new MarsMissionSimulator();
    missionSimulator.createWorldGrid(4, 8);
    missionSimulator.createRobot(2, 3, 'E', commands);
    missionSimulator.createRobot(0, 2, 'N', 'FFLFRFF');
    missionSimulator.runSimulation();
    expect(missionSimulator.robots[0].x).toBe(4);
    expect(missionSimulator.robots[0].y).toBe(4);
    expect(missionSimulator.robots[0].orientation).toBe('E');
    expect(missionSimulator.robots[1].x).toBe(0);
    expect(missionSimulator.robots[1].y).toBe(4);
    expect(missionSimulator.robots[1].orientation).toBe('W');
    expect(missionSimulator.robots[1].isLost).toBe(true);
    expect(missionSimulator.statusReports).toStrictEqual([
      '(4, 4, E)',
      '(0, 4, W) LOST',
    ]);
  });
});
