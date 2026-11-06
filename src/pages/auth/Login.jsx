
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../App.css'

function Login() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const response = await fetch(
                'http://localhost:5001/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.')
            }

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('user', JSON.stringify(data.user))

            navigate('/dashboard')

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-brand">
                    <span className="brand-symbol">S</span>
                    <span>
                        skill<span className="brand-highlight">swap</span>
                    </span>
                </div>

                <h1>Welcome back!</h1>

                <p className="auth-subtitle">
                    Continue your learning journey with your campus community.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <label htmlFor="email">Email Address</label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">Password</label>

                    <div className="password-wrapper">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>

                    </div>

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="login-options">

                        <label className="remember-label">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="button button-dark auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In ↗'}
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to home
                </Link>

            </div>
        </div>
    )
}

export default Login
