import { WorldGrid, Robot, MarsMissionSimulator } from './index'

describe('WorldGrid', () => {
  test('WorldGrid is modelled as a grid with size m x n.', () => {
    const worldGrid = new WorldGrid(5, 3)
    expect(worldGrid).toBeInstanceOf(WorldGrid)
    expect(worldGrid.m).toBe(5)
    expect(worldGrid.n).toBe(3)
  })
})

describe('Robot', () => {
  const worldGrid = new WorldGrid(5, 3)

  test('Robot has a position (x, y), and an orientation (N, E, S, W).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid)
    expect(robot).toBeInstanceOf(Robot)
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
  })

  test('Robot can move forward one space (F).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid)
    robot.moveForward()
    expect(robot.x).toBe(2)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
  })

  test('Robot can rotate left by 90 degrees (L).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid)
    robot.rotateLeft()
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('N')
  })

  test('Robot can rotate right by 90 degrees (R).', () => {
    const robot = new Robot(1, 1, 'E', worldGrid)
    robot.rotateRight()
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('S')
  })

  test('If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.', () => {
    const robot = new Robot(1, 1, 'E', worldGrid)
    robot.moveForward()
    robot.moveForward()
    robot.moveForward()
    robot.moveForward()
    robot.moveForward()
    expect(robot.x).toBe(5)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
    expect(robot.isLost).toBe(true)
  })
})

describe('MarsMissionSimulator', () => {
  const worldGrid = new WorldGrid(5, 3)

  test('MarsMissionSimulator can take a string of instructions and execute them on a robot.', () => {
    const missionSimulator = new MarsMissionSimulator()
    const robot = new Robot(1, 1, 'E', worldGrid)
    missionSimulator.run(robot, 'RFRFRFRF')
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
  })

  test('MarsMissionSimulator can provide a robots status.', () => {
    const missionSimulator = new MarsMissionSimulator()
    const robot = new Robot(1, 1, 'E', worldGrid)
    const status = missionSimulator.provideRobotStatusReport(robot)
    expect(status).toBe('{(1, 1, E)}')
  })

  test('MarsMissionSimulator can provide a robots status if it is lost.', () => {
    const missionSimulator = new MarsMissionSimulator()
    const robot = new Robot(3, 2, 'N', worldGrid)
    missionSimulator.run(robot, 'FRRFLLFFRRFLL')
    const status = missionSimulator.provideRobotStatusReport(robot)
    expect(status).toBe('{(3, 3, N) LOST}')
  })

  test('MarsMissionSimulator can  and store a world grid.', () => {
    const missionSimulator = new MarsMissionSimulator()
    missionSimulator.createWorldGrid(5, 3)
    expect(missionSimulator.worldGrid).toBeInstanceOf(WorldGrid)
    expect(missionSimulator.worldGrid?.m).toBe(5)
    expect(missionSimulator.worldGrid?.n).toBe(3)
  })

  test('MarsMissionSimulator can create and store robot.', () => {
    const missionSimulator = new MarsMissionSimulator()
    missionSimulator.createWorldGrid(5, 3)
    missionSimulator.createRobot(1, 1, 'E')
    expect(missionSimulator.robots[0]).toBeInstanceOf(Robot)
    expect(missionSimulator.robots[0].x).toBe(1)
    expect(missionSimulator.robots[0].y).toBe(1)
    expect(missionSimulator.robots[0].orientation).toBe('E')
  })
})