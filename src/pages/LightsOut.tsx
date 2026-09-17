import { useNavigate } from 'react-router'

function LightsOut() {
  const navigate = useNavigate()

  return (
    <div className="lightsOut">
        <button onClick={() => navigate('/Games')}>Back</button>
    </div>
  )
}

export default LightsOut
