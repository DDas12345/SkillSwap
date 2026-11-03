
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const students = [
    {
        id: 1,
        name: 'Aarav Sharma',
        initials: 'AS',
        department: 'Computer Science',
        year: '2nd Year',
        skill: 'Python',
        category: 'Technology',
        icon: '💻',
        description: 'I can teach Python fundamentals and problem solving.',
    },
    {
        id: 2,
        name: 'Riya Mehta',
        initials: 'RM',
        department: 'Design',
        year: '2nd Year',
        skill: 'UI/UX Design',
        category: 'Design',
        icon: '🎨',
        description: 'I can help you learn Figma and interface design.',
    },
    {
        id: 3,
        name: 'Kabir Verma',
        initials: 'KV',
        department: 'Computer Science',
        year: '3rd Year',
        skill: 'React',
        category: 'Technology',
        icon: '⚛️',
        description: 'I can teach React components and frontend basics.',
    },
    {
        id: 4,
        name: 'Ananya Das',
        initials: 'AD',
        department: 'Business',
        year: '1st Year',
        skill: 'Public Speaking',
        category: 'Communication',
        icon: '🗣️',
        description: 'I can help improve confidence and presentation skills.',
    },
    {
        id: 5,
        name: 'Ishaan Kapoor',
        initials: 'IK',
        department: 'Business',
        year: '3rd Year',
        skill: 'Resume Building',
        category: 'Career',
        icon: '📈',
        description: 'I can help you create professional resumes.',
    },
]

const categories = [
    'All',
    'Technology',
    'Design',
    'Communication',
    'Career',
]

function ExploreSkills() {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sentRequests, setSentRequests] = useState([])

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
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/login">Log In</Link>
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
                    {filteredStudents.length === 0 && (
                        <div className="no-results">
                            <span>🌌</span>
                            <h3>No matching skills found</h3>
                            <p>Try another search or category.</p>
                        </div>
                    )}

                </section>

            </main>
        </div>
    )
}

export default ExploreSkills
