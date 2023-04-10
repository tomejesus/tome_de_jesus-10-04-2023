// - Reads command line inputs, creates world grid, updates the robots, and prints out the final states of the robots.
// - World is modelled as a grid with size m x n.
// - Each robot has a position (x, y), and an orientation (N, E, S, W).
// - Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R).
// - If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.
// - (0, 0) represents the south-west corner of the grid.

import { WorldGrid, Robot } from './index'

describe('WorldGrid', () => {
  test('WorldGrid is modelled as a grid with size m x n.', () => {
    const worldGrid = new WorldGrid(5, 3)
    expect(worldGrid).toBeInstanceOf(WorldGrid)
    expect(worldGrid.m).toBe(5)
    expect(worldGrid.n).toBe(3)
  })
})

describe('Robot', () => {
  test('Robot has a position (x, y), and an orientation (N, E, S, W).', () => {
    const robot = new Robot(1, 1, 'E')
    expect(robot).toBeInstanceOf(Robot)
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
  })

  test('Robot can move forward one space (F).', () => {
    const robot = new Robot(1, 1, 'E')
    robot.moveForward()
    expect(robot.x).toBe(2)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('E')
  })

  test('Robot can rotate left by 90 degrees (L).', () => {
    const robot = new Robot(1, 1, 'E')
    robot.rotateLeft()
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(1)
    expect(robot.orientation).toBe('N')
  })
})
