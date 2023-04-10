// - Reads command line inputs, creates world grid, updates the robots, and prints out the final states of the robots.
// - World is modelled as a grid with size m x n.
// - Each robot has a position (x, y), and an orientation (N, E, S, W).
// - Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R).
// - If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded.
// - (0, 0) represents the south-west corner of the grid.

import { WorldGrid } from './index'

describe('WorldGrid', () => {
  test('WorldGrid is modelled as a grid with size m x n.', () => {
    const worldGrid = new WorldGrid(5, 3)
    expect(worldGrid).toBeInstanceOf(WorldGrid)
    expect(worldGrid.m).toBe(5)
    expect(worldGrid.n).toBe(3)
  })
})
