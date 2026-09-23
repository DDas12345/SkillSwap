import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Offer from './pages/Offer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;