import { useEffect, useState } from 'react'
import '../App.css'

const categoryIcons = {
    Technology: '💻',
    Design: '🎨',
    Communication: '🗣️',
    Career: '📈',
    General: '✨',
}

function ExploreSkills() {

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    // Persisted outgoing requests
    const [sentRequests, setSentRequests] = useState([])
    const [requestingStudentId, setRequestingStudentId] = useState(null)
    const [requestError, setRequestError] = useState('')

    // Students fetched from the backend
    const [students, setStudents] = useState([])

    // Loading and error states
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch students and existing outgoing requests
    useEffect(() => {
        const controller = new AbortController()

        const fetchStudents = async () => {
            try {
                setError('')

                const token = localStorage.getItem('accessToken')

                if (!token) {
                    throw new Error('Please log in to explore students.')
                }

                // Fetch students offering teaching skills
                const response = await fetch(
                    'http://localhost:5001/api/skills/explore',
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
                        data.message || 'Failed to load students.'
                    )
                }

                if (!Array.isArray(data.students)) {
                    throw new Error('Invalid student data received.')
                }

                // Format student data for the Explore cards
                const formattedStudents = data.students.map((student) => {
                    const yearNumber = Number(student.yearOfStudy)

                    let yearLabel = 'Year not specified'

                    if (yearNumber >= 1 && yearNumber <= 4) {
                        const suffix = {
                            1: 'st',
                            2: 'nd',
                            3: 'rd',
                            4: 'th',
                        }[yearNumber]

                        yearLabel = `${yearNumber}${suffix} Year`
                    }

                    return {
                        id: student.id,
                        userId: student.userId,

                        // Important: actual Skill table ID
                        skillId: student.skillId,

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
                        description:
                            student.bio ||
                            'This student is sharing this skill with the campus community.',
                    }
                })

                setStudents(formattedStudents)

                // Fetch existing outgoing requests
                try {
                    const requestsResponse = await fetch(
                        'http://localhost:5001/api/requests',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            signal: controller.signal,
                        }
                    )

                    if (requestsResponse.ok) {
                        const requestsData = await requestsResponse.json()

                        const pendingKeys = (
                            requestsData.outgoingRequests || []
                        )
                            .filter(
                                (request) => request.status === 'PENDING'
                            )
                            .map(
                                (request) =>
                                    `${request.receiverId}:${request.requestedSkillId}`
                            )

                        setSentRequests(pendingKeys)
                    } else {
                        console.error(
                            'Unable to fetch existing requests:',
                            requestsResponse.status
                        )
                    }
                } catch (requestFetchError) {
                    if (requestFetchError.name !== 'AbortError') {
                        console.error(
                            'Unable to load existing requests:',
                            requestFetchError
                        )
                    }
                }

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

        fetchStudents()

        return () => controller.abort()
    }, [])

    // Send a real exchange request to PostgreSQL
    const handleConnect = async (student) => {
        const requestKey = `${student.userId}:${student.skillId}`

        if (
            sentRequests.includes(requestKey) ||
            requestingStudentId === requestKey
        ) {
            return
        }

        try {
            setRequestError('')

            const token = localStorage.getItem('accessToken')

            if (!token) {
                throw new Error('Please log in to send a request.')
            }

            setRequestingStudentId(requestKey)

            const response = await fetch(
                'http://localhost:5001/api/requests',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        receiverId: student.userId,
                        requestedSkillId: student.skillId,
                        message: `Hi ${student.name}, I would like to learn ${student.skill}.`,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Unable to send exchange request.'
                )
            }

            // Update the button only after the server confirms success
            setSentRequests((previousRequests) => [
                ...previousRequests,
                requestKey,
            ])

        } catch (err) {
            setRequestError(err.message)
        } finally {
            setRequestingStudentId(null)
        }
    }

    // Generate categories from database results
    const categories = [
        'All',
        ...new Set(
            students
                .map((student) => student.category)
                .filter(Boolean)
        ),
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

                {/* Request error */}
                {requestError && (
                    <div className="no-results" role="alert">
                        <p>{requestError}</p>
                    </div>
                )}

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

                        {filteredStudents.map((student) => {
                            const requestKey =
                                `${student.userId}:${student.skillId}`

                            const requestAlreadySent =
                                sentRequests.includes(requestKey)

                            const isSending =
                                requestingStudentId === requestKey

                            return (
                                <article
                                    className="student-card"
                                    key={student.id}
                                >

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

                                    {/* Persistent connection request */}
                                    <button
                                        className={`connect-button ${
                                            requestAlreadySent
                                                ? 'request-sent'
                                                : ''
                                        }`}
                                        type="button"
                                        disabled={
                                            requestAlreadySent || isSending
                                        }
                                        onClick={() => handleConnect(student)}
                                    >
                                        {isSending
                                            ? 'Sending...'
                                            : requestAlreadySent
                                                ? 'Request Sent ✓'
                                                : 'Connect ↗'}
                                    </button>

                                    {requestAlreadySent && (
                                        <p className="request-success">
                                            ✨ Connection request sent successfully!
                                        </p>
                                    )}

                                </article>
                            )
                        })}

                    </div>

                    {/* No Results Message */}
                    {!isLoading &&
                        !error &&
                        filteredStudents.length === 0 && (
                            <div className="no-results">
                                <span>🌌</span>
                                <h3>No students sharing skills yet</h3>
                                <p>
                                    Be the first to share your knowledge
                                    with the campus community!
                                </p>
                            </div>
                        )}

                </section>

            </main>
        </div>
    )
}

export default ExploreSkills
