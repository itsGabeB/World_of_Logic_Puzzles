import { useState } from 'react'
import { useNavigate } from 'react-router'
import Light from '../components/lights'
import './LightsOut.css'

type Grid = boolean[][]

// Sizes where every arrangement of lights is solvable, so a solved board always
// has exactly one solution. 4x4, 5x5 and 9x9 are left out: most of their boards
// cannot be solved at all, and the solvable ones have several solutions.
const SIZES = [3, 6, 7, 8, 10]

// A square grid of lights, all switched off.
function emptyGrid(size: number): Grid {
  return Array.from({ length: size }, () => Array<boolean>(size).fill(false))
}

// Flips the clicked light plus the ones above, below, left and right of it.
function press(grid: Grid, row: number, col: number): Grid {
  const next = grid.map((r) => [...r])
  const spots = [
    [row, col],
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]
  for (const [r, c] of spots) {
    if (r >= 0 && r < grid.length && c >= 0 && c < grid.length) {
      next[r][c] = !next[r][c]
    }
  }
  return next
}

function isSolved(grid: Grid): boolean {
  return grid.every((row) => row.every((on) => !on))
}

// Random presses on an empty board, so the puzzle is always solvable.
function generatePuzzle(size: number): Grid {
  let grid = emptyGrid(size)
  for (let i = 0; i < size * 3; i++) {
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    grid = press(grid, row, col)
  }
  // Presses can cancel each other out and leave a board that is already solved.
  return isSolved(grid) ? generatePuzzle(size) : grid
}

function LightsOut() {
  const navigate = useNavigate()
  const [size, setSize] = useState(8)
  const [grid, setGrid] = useState(() => generatePuzzle(8))
  const [moves, setMoves] = useState(0)

  const solved = isSolved(grid)

  function handlePress(row: number, col: number) {
    if (solved) return
    setGrid(press(grid, row, col))
    setMoves(moves + 1)
  }

  function newPuzzle(nextSize: number) {
    setSize(nextSize)
    setGrid(generatePuzzle(nextSize))
    setMoves(0)
  }

  return (
    <div className="lightsOut">
      <h1>Lights Out</h1>
      <p>Turn every light off. Clicking a light also flips its neighbors.</p>

      <div className="controls">
        <label>
          Size:{' '}
          <select value={size} onChange={(e) => newPuzzle(Number(e.target.value))}>
            {SIZES.map((n) => (
              <option key={n} value={n}>
                {n} x {n}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => newPuzzle(size)}>New puzzle</button>
        <span>Moves: {moves}</span>
      </div>

      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((on, c) => (
            <Light key={`${r}-${c}`} on={on} onClick={() => handlePress(r, c)} />
          )),
        )}
      </div>

      {solved && <p className="won">Solved in {moves} moves!</p>}

      <button onClick={() => navigate('/games')}>Back</button>
    </div>
  )
}

export default LightsOut
