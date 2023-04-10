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

  describe('MarsMissionSimulator', () => {
    const worldGrid = new WorldGrid(5, 3)

    test('MarsMissionSimulator can take a string of instructions and execute them on a robot.', () => {
      const robotSimulator = new MarsMissionSimulator(new Robot(1, 1, 'E', worldGrid))
      robotSimulator.run('RFRFRFRF')
      expect(robotSimulator.robot.x).toBe(1)
      expect(robotSimulator.robot.y).toBe(1)
      expect(robotSimulator.robot.orientation).toBe('E')
    })
  })
})
