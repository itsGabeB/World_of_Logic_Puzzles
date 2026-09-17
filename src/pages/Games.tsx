import { Link } from 'react-router'
import { useNavigate } from 'react-router'

function Games() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Games</h1>
      <ul>
        <li>Sudoku</li>
        <li>Pipes</li>
        <li onClick={() => navigate('/games/LightsOut')}>Lights Out</li>
        <li>Minesweeper</li>
        <li>Shikaku</li>
      </ul>
      <Link to="/">Back</Link>
    </div>
  )
}

export default Games
