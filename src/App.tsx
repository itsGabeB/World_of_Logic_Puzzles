import { Routes, Route } from 'react-router'
import Home from './pages/Home.tsx'
import Games from './pages/Games.tsx'
import LightsOut from './pages/LightsOut.tsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/LightsOut" element={<LightsOut />} />
    </Routes>
  )
}

export default App
