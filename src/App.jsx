import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import ExploreSkills from './pages/ExploreSkills'
import MySkills from './pages/MySkills'

// Protect routes that require login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <ExploreSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-skills"
          element={
            <ProtectedRoute>
              <MySkills />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App