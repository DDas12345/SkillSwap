
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        course: '',
        yearOfStudy: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle registration
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        if (formData.password.length < 8) {
            setError('Password must contain at least 8 characters.')
            return
        }

        try {
            setLoading(true)

            const response = await fetch(
                'http://localhost:5001/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        course: formData.course,
                        yearOfStudy: formData.yearOfStudy
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed.')
            }

            setSuccess(data.message)

            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                course: '',
                yearOfStudy: ''
            })

            setShowPassword(false)
            setShowConfirmPassword(false)

        } catch (err) {
            setError(
                err.message || 'Unable to connect to the server.'
            )
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

                <h1>Create your account</h1>

                <p className="auth-subtitle">
                    Join your campus community and start exchanging skills.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <label htmlFor="name">Full Name</label>

                    <input
                        type="text"
                        id="name"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <label htmlFor="email">College Email</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your college email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Password */}
                    <label htmlFor="password">Password</label>

                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>

                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={
                                showConfirmPassword
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {/* Course */}
                    <label htmlFor="department">
                        Course / Department
                    </label>

                    <input
                        type="text"
                        id="department"
                        name="course"
                        placeholder="e.g. Computer Science"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />

                    {/* Year of Study */}
                    <label htmlFor="year">Year of Study</label>

                    <select
                        id="year"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select your year
                        </option>

                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                    </select>

                    {/* Error Message */}
                    {error && (
                        <p role="alert" style={{ color: 'red' }}>
                            {error}
                        </p>
                    )}

                    {/* Success Message */}
                    {success && (
                        <p role="status" style={{ color: 'green' }}>
                            {success}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="button button-dark auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? 'Creating Account...'
                            : 'Create Account ↗'}
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
