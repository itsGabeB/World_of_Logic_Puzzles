import { useNavigate } from "react-router"
import { useState } from "react"
import CellButton from "../components/cell"
import "./Minesweeper.css"


export type Cell = { mine: boolean; revealed: boolean; flagged: boolean; count: number }
type Board = Cell[][]

// Each size carries its own mine count, which Step 5 needs when it places them.
const SIZES = [
    { size: 9, mines: 10 },
    { size: 10, mines: 12 },
    { size: 11, mines: 15 },
]

type Status = 'ready' | 'playing' | 'won' | 'lost'


// The positions of the up-to-8 cells touching the one at (row, col), diagonals
// included. Cells on an edge or in a corner have fewer, so every caller would
// otherwise repeat the same bounds check.
function neighbors(board: Board, row: number, col: number): [number, number][] {
    const positions: [number, number][] = []

    // Every combination of one step up, none, or one step down, crossed with the
    // same left to right. That's nine, and the ninth is the cell itself.
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
            if (rowOffset === 0 && colOffset === 0) continue

            const neighborRow = row + rowOffset
            const neighborCol = col + colOffset

            // board.length is the number of rows, board[0].length the number of
            // columns. They differ on a non-square board, so each axis is
            // checked against its own limit.
            const insideBoard =
                neighborRow >= 0 &&
                neighborRow < board.length &&
                neighborCol >= 0 &&
                neighborCol < board[0].length

            if (insideBoard) {
                positions.push([neighborRow, neighborCol])
            }
        }
    }

    return positions
}


// Every cell starts hidden and empty. The mines and counts get filled in on the
// first click, so that click can never land on a mine.
function createBoard(rows: number, cols: number): Board {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            mine: false,
            revealed: false,
            flagged: false,
            count: 0,
        })),
        
    )
}

function placeMines(board: Board, mineCount: number, safeRow: number, safeCol: number): Board {
    for(let i=0; i<mineCount;){
        const row = randomInt(0, board.length)
        const col = randomInt(0, board[0].length)
        if(!board[row][col].mine){
            board[row][col].mine=true
            i++
        }
    }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function Minesweeper() {
    const [status, setStatus] = useState<Status>('ready')
    const [board, setBoard] = useState(() => createBoard(9, 9))
    const [boardSize, setBoardSize] = useState(SIZES[0].size)
    const navigate = useNavigate()

    // Picking a size starts a fresh board, so the grid matches the dropdown.
    function changeSize(size: number) {
        setBoardSize(size)
        setBoard(createBoard(size, size))
        setStatus('ready')
    }

    return <div className="minesweeper">
        <h1>Minesweeper</h1>
        <select value={boardSize} onChange={(e) => changeSize(Number(e.target.value))}>
            {SIZES.map(({ size, mines }) => (
                <option key={size} value={size}>
                    {size} x {size} — {mines} mines
                </option>
            ))}
        </select>

        <div className="board" style={{ gridTemplateColumns: `repeat(${board[0].length}, 1fr)` }}>
            {board.map((row, r) =>
                row.map((cell, c) => (
                    <CellButton
                        key={`${r}-${c}`}
                        cell={cell}
                        onReveal={() => {}}
                        onFlag={() => {}}
                    />
                )),
            )}
        </div>

        <button onClick={() => navigate('/games')}>Back</button>
    </div>
    
}

export default Minesweeper
