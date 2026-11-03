import { Link } from 'react-router-dom'
import '../../App.css'

function Register() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="brand-symbol">S</span>
                    <span>skill<span className="brand-highlight">swap</span></span>
                </div>

                <h1>Create your account</h1>
                <p className="auth-subtitle">
                    Join your campus community and start exchanging skills.
                </p>

                <form className="auth-form">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        required
                    />

                    <label htmlFor="email">College Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your college email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        required
                    />

                    <label htmlFor="department">Course / Department</label>
                    <input
                        type="text"
                        id="department"
                        placeholder="e.g. Computer Science"
                        required
                    />

                    <label htmlFor="year">Year of Study</label>
                    <select id="year" required defaultValue="">
                        <option value="" disabled>Select your year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                    </select>

                    <button type="submit" className="button button-dark auth-submit">
                        Create Account ↗
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to home
                </Link>
            </div>
        </div>
    )
}

export default Register
