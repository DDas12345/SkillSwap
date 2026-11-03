import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false)

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

                <form className="auth-form">
                    <label htmlFor="email">College Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your college email"
                        required
                    />

                    <label htmlFor="password">Password</label>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
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
                    >
                        Log In ↗
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