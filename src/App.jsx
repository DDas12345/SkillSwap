import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import ExploreSkills from './pages/ExploreSkills'
import MySkills from './pages/MySkills'
import Requests from './pages/Requests'
import Profile from './pages/Profile'

import AppNavbar from './components/AppNavbar'
import { ThemeProvider } from './context/ThemeContext'

// Pages that require authentication
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('accessToken')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="authenticated-layout">
            <AppNavbar />

            <main className="authenticated-main">
                {children}
            </main>
        </div>
    )
}

// Pages that should only be visible when logged out
function PublicOnlyRoute({ children }) {
    const token = localStorage.getItem('accessToken')

    if (token) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

// Home page: show sidebar only when logged in
function HomeRoute() {
    const token = localStorage.getItem('accessToken')

    return token ? (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
    ) : (
        <Home />
    )
}

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>

                    {/* Public pages */}
                    <Route
                        path="/"
                        element={
                            <PublicOnlyRoute>
                                <Welcome />
                            </PublicOnlyRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <PublicOnlyRoute>
                                <Login />
                            </PublicOnlyRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <PublicOnlyRoute>
                                <Register />
                            </PublicOnlyRoute>
                        }
                    />

                    {/* Home */}
                    <Route
                        path="/home"
                        element={<HomeRoute />}
                    />

                    {/* Protected pages */}
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

                    <Route
                        path="/requests"
                        element={
                            <ProtectedRoute>
                                <Requests />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Unknown routes */}
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App