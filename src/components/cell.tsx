import type { Cell } from '../pages/Minesweeper'

type CellProps = {
    cell: Cell
    onReveal: () => void
    onFlag: () => void
}

// Hidden cells show a flag or nothing at all. Revealed ones show the mine that
// ended the game, the number of mines touching them, or nothing when that's 0.
function label(cell: Cell): string {
    if (!cell.revealed) return cell.flagged ? '🚩' : ''
    if (cell.mine) return '💣'
    return cell.count === 0 ? '' : String(cell.count)
}

function CellButton({ cell, onReveal, onFlag }: CellProps) {
    return (
        <button
            className={cell.revealed ? 'cell revealed' : 'cell hidden'}
            onClick={onReveal}
            onContextMenu={(e) => {
                // Without this the browser's own right-click menu opens instead.
                e.preventDefault()
                onFlag()
            }}
        >
            {label(cell)}
        </button>
    )
}

export default CellButton
