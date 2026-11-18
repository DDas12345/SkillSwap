import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const categoryIcons = {
    Technology: '💻',
    Design: '🎨',
    Communication: '🗣️',
    Career: '📈',
    General: '✨'
}

function ExploreSkills() {
    const isLoggedIn = Boolean(
        localStorage.getItem('accessToken')
    )
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sentRequests, setSentRequests] = useState([])

    // Students fetched from the backend
    const [students, setStudents] = useState([])

    // Loading and error states
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setError('')

                const token = localStorage.getItem('accessToken')

                if (!token) {
                    throw new Error('Please log in to explore students.')
                }

                const response = await fetch(
                    'http://localhost:5001/api/skills/explore',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Failed to load students.'
                    )
                }

                // Convert API records into the format used by our cards
                const formattedStudents = data.students.map((student) => {
                    const yearNumber = Number(student.yearOfStudy)

                    let yearLabel = 'Year not specified'

                    if (yearNumber >= 1 && yearNumber <= 4) {
                        const suffix = {
                            1: 'st',
                            2: 'nd',
                            3: 'rd',
                            4: 'th'
                        }[yearNumber]

                        yearLabel = `${yearNumber}${suffix} Year`
                    }

                    return {
                        id: student.id,
                        userId: student.userId,
                        name: student.fullName,
                        initials: student.fullName
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase(),
                        department: student.course || 'Course not specified',
                        year: yearLabel,
                        skill: student.skill,
                        category: student.category,
                        icon: categoryIcons[student.category] || '✨',
                        description: student.bio ||
                            'This student is sharing this skill with the campus community.'
                    }
                })

                setStudents(formattedStudents)

            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStudents()
    }, [])

    // Handle connection requests
    const handleConnect = (student) => {
        if (sentRequests.includes(student.id)) {
            return
        }

        setSentRequests((previousRequests) => [
            ...previousRequests,
            student.id,
        ])
    }

    // Generate categories from the students fetched from the database
    const categories = [
        'All',
        ...new Set(
            students
                .map((student) => student.category)
                .filter(Boolean)
        )
    ]

    // Search and category filtering
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.skill.toLowerCase().includes(search.toLowerCase()) ||
            student.name.toLowerCase().includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === 'All' ||
            student.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="explore-page">

            {/* Header */}
            <header className="explore-header">
                <Link to="/" className="brand">
                    <span className="brand-symbol">S</span>
                    <span>
                        skill<span className="brand-highlight">swap</span>
                    </span>
                </Link>

                <nav className="explore-nav">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/my-skills">My Skills</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Sign Up</Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="explore-main">

                {/* Introduction */}
                <section className="explore-intro">
                    <p className="dashboard-eyebrow">
                        DISCOVER YOUR COMMUNITY
                    </p>

                    <h1>
                        Find your next
                        <br />
                        <span>learning partner.</span>
                    </h1>

                    <p>
                        Explore skills shared by students and discover
                        someone who can teach you something new.
                    </p>
                </section>

                {/* Search and Category Filters */}
                <section className="explore-controls">

                    <input
                        className="explore-search"
                        type="search"
                        placeholder="Search skills or student names..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <div className="category-filters">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={
                                    selectedCategory === category
                                        ? 'selected'
                                        : ''
                                }
                                onClick={() => setSelectedCategory(category)}
                                type="button"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                </section>

                {/* Student Results */}
                <section className="student-results">

                    <div className="results-heading">
                        <h2>Students sharing their skills</h2>
                        <span>{filteredStudents.length} results</span>
                    </div>

                    {/* Loading message */}
                    {isLoading && (
                        <div className="no-results">
                            <p>Loading students...</p>
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="no-results" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="student-grid">

                        {filteredStudents.map((student) => (

                            <article className="student-card" key={student.id}>

                                <div className="student-card-top">
                                    <div className="student-initials">
                                        {student.initials}
                                    </div>

                                    <span className="student-category">
                                        {student.icon} {student.category}
                                    </span>
                                </div>

                                <h3>{student.name}</h3>

                                <p className="student-details">
                                    {student.department} · {student.year}
                                </p>

                                <div className="student-skill">
                                    <span>CAN TEACH</span>
                                    <strong>{student.skill}</strong>
                                </div>

                                <p className="student-description">
                                    {student.description}
                                </p>

                                {/* Connection Request Button */}
                                <button
                                    className={`connect-button ${sentRequests.includes(student.id)
                                        ? 'request-sent'
                                        : ''
                                        }`}
                                    type="button"
                                    onClick={() => handleConnect(student)}
                                    disabled={sentRequests.includes(student.id)}
                                >
                                    {sentRequests.includes(student.id)
                                        ? 'Request Sent ✓'
                                        : 'Connect ↗'}
                                </button>

                                {/* Success Message */}
                                {sentRequests.includes(student.id) && (
                                    <p className="request-success">
                                        ✨ Connection request sent successfully!
                                    </p>
                                )}

                            </article>

                        ))}

                    </div>

                    {/* No Results Message */}
                    {!isLoading && !error && filteredStudents.length === 0 && (
                        <div className="no-results">
                            <span>🌌</span>
                            <h3>No students sharing skills yet</h3>
                            <p>Be the first to share your knowledge with the campus community!</p>
                        </div>
                    )}

                </section>

            </main>
        </div>
    )
}

export default ExploreSkills
