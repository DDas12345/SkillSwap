import { useEffect, useState } from 'react'
import '../App.css'

const emptyProfile = {
    fullName: '',
    email: '',
    course: '',
    yearOfStudy: '',
    bio: '',
}

function Profile() {
    const [profile, setProfile] = useState(null)
    const [formData, setFormData] = useState(emptyProfile)

    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Load the logged-in student's profile
    useEffect(() => {
        const controller = new AbortController()

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken')

                if (!token) {
                    throw new Error('Please log in to view your profile.')
                }

                const response = await fetch(
                    'http://localhost:5001/api/profile/me',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Unable to load your profile.'
                    )
                }

                const userData = {
                    fullName: data.user.fullName || '',
                    email: data.user.email || '',
                    course: data.user.course || '',
                    yearOfStudy: data.user.yearOfStudy || '',
                    bio: data.user.bio || '',
                }

                setProfile(data.user)
                setFormData(userData)

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        fetchProfile()

        return () => controller.abort()
    }, [])

    // Handle form inputs
    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    // Start editing
    const handleEdit = () => {
        setSuccess('')
        setError('')
        setIsEditing(true)
    }

    // Cancel editing and restore saved information
    const handleCancel = () => {
        setFormData({
            fullName: profile.fullName || '',
            email: profile.email || '',
            course: profile.course || '',
            yearOfStudy: profile.yearOfStudy || '',
            bio: profile.bio || '',
        })

        setIsEditing(false)
        setError('')
        setSuccess('')
    }

    // Save profile changes to PostgreSQL
    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setSuccess('')

        if (!formData.fullName.trim()) {
            setError('Full name is required.')
            return
        }

        try {
            setIsSaving(true)

            const token = localStorage.getItem('accessToken')

            const response = await fetch(
                'http://localhost:5001/api/profile/me',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        course: formData.course,
                        yearOfStudy: formData.yearOfStudy,
                        bio: formData.bio,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Unable to update your profile.'
                )
            }

            setProfile(data.user)

            setFormData({
                fullName: data.user.fullName || '',
                email: data.user.email || '',
                course: data.user.course || '',
                yearOfStudy: data.user.yearOfStudy || '',
                bio: data.user.bio || '',
            })

            // Update cached user information too
            const cachedUser = JSON.parse(
                localStorage.getItem('user') || '{}'
            )

            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...cachedUser,
                    fullName: data.user.fullName,
                    email: data.user.email,
                    course: data.user.course,
                    yearOfStudy: data.user.yearOfStudy,
                })
            )

            setIsEditing(false)
            setSuccess('Your profile has been updated successfully!')

        } catch (err) {
            setError(err.message)
        } finally {
            setIsSaving(false)
        }
    }

    const userInitial = (
        formData.fullName.trim().charAt(0) || 'S'
    ).toUpperCase()

    const yearLabels = {
        1: 'First Year',
        2: 'Second Year',
        3: 'Third Year',
        4: 'Fourth Year',
    }

    if (isLoading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    🌌 Loading your profile...
                </div>
            </div>
        )
    }

    return (
        <div className="profile-page">

            <main className="profile-main">

                {/* Profile introduction */}
                <section className="profile-intro">
                    <p className="dashboard-eyebrow">
                        YOUR IDENTITY
                    </p>

                    <h1>
                        My <span>Profile.</span>
                    </h1>

                    <p>
                        Manage your personal information and introduce
                        yourself to your campus community.
                    </p>
                </section>

                {/* Error and success messages */}
                {error && (
                    <div className="profile-message profile-error" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="profile-message profile-success" role="status">
                        ✅ {success}
                    </div>
                )}

                {profile && (
                    <section className="profile-card">

                        {/* Profile heading */}
                        <div className="profile-card-header">

                            <div className="profile-avatar">
                                {userInitial}
                            </div>

                            <div className="profile-heading-text">
                                <h2>{profile.fullName}</h2>
                                <p>{profile.course || 'Course not added yet'}</p>
                            </div>

                            {!isEditing && (
                                <button
                                    type="button"
                                    className="profile-edit-button"
                                    onClick={handleEdit}
                                >
                                    ✏️ Edit Profile
                                </button>
                            )}

                        </div>

                        <div className="profile-divider" />

                        {/* Profile form */}
                        <form
                            className="profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="profile-form-heading">
                                <h3>Personal Information</h3>
                                <p>
                                    Keep your student information up to date.
                                </p>
                            </div>

                            <div className="profile-form-grid">

                                {/* Full Name */}
                                <div className="profile-field">
                                    <label htmlFor="profile-name">
                                        Full Name
                                    </label>

                                    <input
                                        id="profile-name"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="profile-field">
                                    <label htmlFor="profile-email">
                                        College Email
                                    </label>

                                    <input
                                        id="profile-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        readOnly
                                    />

                                    <small>Email cannot be changed here.</small>
                                </div>

                                {/* Course */}
                                <div className="profile-field">
                                    <label htmlFor="profile-course">
                                        Course / Department
                                    </label>

                                    <input
                                        id="profile-course"
                                        type="text"
                                        name="course"
                                        placeholder="e.g. Computer Science"
                                        value={formData.course}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Year */}
                                <div className="profile-field">
                                    <label htmlFor="profile-year">
                                        Year of Study
                                    </label>

                                    <select
                                        id="profile-year"
                                        name="yearOfStudy"
                                        value={formData.yearOfStudy}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="">
                                            Select your year
                                        </option>

                                        <option value="1">First Year</option>
                                        <option value="2">Second Year</option>
                                        <option value="3">Third Year</option>
                                        <option value="4">Fourth Year</option>
                                    </select>
                                </div>

                            </div>

                            {/* Bio */}
                            <div className="profile-field profile-bio-field">
                                <label htmlFor="profile-bio">
                                    About Me
                                </label>

                                <textarea
                                    id="profile-bio"
                                    name="bio"
                                    placeholder="Tell other students about yourself, your interests and what you enjoy learning..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    maxLength={500}
                                    rows={5}
                                />

                                <small>
                                    {formData.bio.length}/500 characters
                                </small>
                            </div>

                            {/* Action buttons */}
                            {isEditing && (
                                <div className="profile-actions">

                                    <button
                                        type="button"
                                        className="profile-cancel-button"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="profile-save-button"
                                        disabled={isSaving}
                                    >
                                        {isSaving
                                            ? 'Saving...'
                                            : 'Save Changes ↗'}
                                    </button>

                                </div>
                            )}

                        </form>

                        {/* Profile details */}
                        {!isEditing && (
                            <div className="profile-extra-details">
                                <div>
                                    <span>🎓</span>
                                    <p>Year of Study</p>
                                    <strong>
                                        {yearLabels[profile.yearOfStudy] ||
                                            'Not specified'}
                                    </strong>
                                </div>

                                <div>
                                    <span>🌱</span>
                                    <p>About Me</p>
                                    <strong>
                                        {profile.bio || 'No bio added yet.'}
                                    </strong>
                                </div>
                            </div>
                        )}

                    </section>
                )}

            </main>

        </div>
    )
}

export default Profile