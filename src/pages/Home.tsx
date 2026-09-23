import { useNavigate } from 'react-router'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="title">
      <span>world of logic puzzles</span>
      <button onClick={() => navigate('/games')}>Play</button>
    </div>
  )
}

export default Home
