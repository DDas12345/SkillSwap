import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Dashboard() {

    // Dashboard data
    const [mySkills, setMySkills] = useState([])
    const [skillsLoading, setSkillsLoading] = useState(true)
    const [skillsError, setSkillsError] = useState('')
    const [skillMatchesCount, setSkillMatchesCount] = useState(0)
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0)

    // Get logged-in user's information
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('accessToken')

    const userName = user.fullName || 'Student'
    const userInitial = userName.charAt(0).toUpperCase()

    // Fetch skills belonging to the logged-in user
    useEffect(() => {
        const controller = new AbortController()

        const fetchDashboardData = async () => {
            if (!token) {
                setSkillsError('Please log in to view your dashboard.')
                setSkillsLoading(false)
                return
            }

            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                }

                // Fetch personal skills, other students' teaching skills,
                // and incoming/outgoing exchange requests together.
                const [skillsResponse, exploreResponse, requestsResponse] =
                    await Promise.all([
                        fetch('http://localhost:5001/api/skills', {
                            headers,
                            signal: controller.signal,
                        }),
                        fetch('http://localhost:5001/api/skills/explore', {
                            headers,
                            signal: controller.signal,
                        }),
                        fetch('http://localhost:5001/api/requests', {
                            headers,
                            signal: controller.signal,
                        }),
                    ])

                const [skillsData, exploreData, requestsData] =
                    await Promise.all([
                        skillsResponse.json(),
                        exploreResponse.json(),
                        requestsResponse.json(),
                    ])

                if (!skillsResponse.ok) {
                    throw new Error(
                        skillsData.message || 'Unable to fetch your skills.'
                    )
                }

                if (!exploreResponse.ok) {
                    throw new Error(
                        exploreData.message || 'Unable to fetch skill matches.'
                    )
                }

                if (!requestsResponse.ok) {
                    throw new Error(
                        requestsData.message || 'Unable to fetch requests.'
                    )
                }

                const personalSkills = Array.isArray(skillsData.skills)
                    ? skillsData.skills
                    : []

                const otherStudents = Array.isArray(exploreData.students)
                    ? exploreData.students
                    : []

                const incomingRequests = Array.isArray(
                    requestsData.incomingRequests
                )
                    ? requestsData.incomingRequests
                    : []

                // Store the current user's skills
                setMySkills(personalSkills)

                // Find the skills this student wants to learn
                const learningSkillIds = new Set(
                    personalSkills
                        .filter((item) => item.type === 'LEARNING')
                        .map((item) => item.skillId)
                )

                // Count distinct students offering at least one skill
                // that the current user wants to learn.
                const matchingStudentIds = new Set(
                    otherStudents
                        .filter((student) =>
                            learningSkillIds.has(student.skillId)
                        )
                        .map((student) => student.userId)
                )

                setSkillMatchesCount(matchingStudentIds.size)

                // Count only incoming requests awaiting a response
                const pendingCount = incomingRequests.filter(
                    (request) => request.status === 'PENDING'
                ).length

                setPendingRequestsCount(pendingCount)

                setSkillsError('')

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Dashboard data error:', error)
                    setSkillsError(error.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setSkillsLoading(false)
                }
            }
        }

        fetchDashboardData()

        return () => controller.abort()
    }, [token])

    // Calculate dashboard statistics
    const teachingCount = mySkills.filter(
        (item) => item.type === 'TEACHING'
    ).length

    const learningCount = mySkills.filter(
        (item) => item.type === 'LEARNING'
    ).length

    return (
        <div className="dashboard-page">

            {/* Main Content */}
            <main className="dashboard-main">

                {/* Header */}
                <header className="dashboard-header">

                    <div>
                        <p className="dashboard-eyebrow">
                            YOUR LEARNING SPACE
                        </p>

                        <h1>
                            Welcome back, {userName}! 👋
                        </h1>

                        <p>
                            Ready to learn something new today?
                        </p>
                    </div>

                    <div className="dashboard-avatar">
                        {userInitial}
                    </div>

                </header>

                {/* Statistics */}
                <section className="dashboard-stats">

                    <article className="stat-card">
                        <span>✨</span>
                        <h2>
                            {skillsLoading ? '...' : teachingCount}
                        </h2>
                        <p>Skills Teaching</p>
                    </article>

                    <article className="stat-card">
                        <span>📚</span>
                        <h2>
                            {skillsLoading ? '...' : learningCount}
                        </h2>
                        <p>Skills Learning</p>
                    </article>

                    <article className="stat-card">
                        <span>🤝</span>
                        <h2>{skillsLoading ? '...' : skillMatchesCount}</h2>
                        <p>Skill Matches</p>
                    </article>

                    <article className="stat-card">
                        <span>💌</span>
                        <h2>{skillsLoading ? '...' : pendingRequestsCount}</h2>
                        <p>Pending Requests</p>
                    </article>

                </section>

                {/* My Skills Section */}
                <section className="dashboard-section">

                    <div className="dashboard-section-heading">

                        <div>
                            <p className="dashboard-eyebrow">
                                YOUR KNOWLEDGE
                            </p>

                            <h2>My Skills</h2>
                        </div>

                        <Link
                            to="/my-skills"
                            className="dashboard-button"
                        >
                            Manage Skills ↗
                        </Link>

                    </div>

                    {/* Loading state */}
                    {skillsLoading && (
                        <div className="empty-state">
                            <span>🌌</span>
                            <h3>Loading your learning universe...</h3>
                            <p>
                                We're fetching your skills.
                            </p>
                        </div>
                    )}

                    {/* Error state */}
                    {!skillsLoading && skillsError && (
                        <div className="empty-state">
                            <span>⚠️</span>

                            <h3>Unable to load your skills.</h3>

                            <p>{skillsError}</p>

                            <button
                                type="button"
                                className="dashboard-button"
                                onClick={() => window.location.reload()}
                            >
                                Try Again ↻
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!skillsLoading &&
                        !skillsError &&
                        mySkills.length === 0 && (
                            <div className="empty-state">

                                <span>🌌</span>

                                <h3>
                                    Your learning universe starts here.
                                </h3>

                                <p>
                                    Add skills you can teach and skills
                                    you want to learn.
                                </p>

                                <Link
                                    to="/my-skills"
                                    className="dashboard-button"
                                >
                                    Add Your Skills ↗
                                </Link>

                            </div>
                        )}

                    {/* Actual skills from PostgreSQL */}
                    {!skillsLoading &&
                        !skillsError &&
                        mySkills.length > 0 && (
                            <div className="dashboard-stats">

                                {mySkills.map((item) => (
                                    <article
                                        className="stat-card"
                                        key={item.id}
                                    >

                                        <span>
                                            {item.type === 'TEACHING'
                                                ? '✨'
                                                : '📚'}
                                        </span>

                                        <h3>
                                            {item.skill?.name || 'Unnamed Skill'}
                                        </h3>

                                        <p>
                                            {item.type === 'TEACHING'
                                                ? 'I can teach this'
                                                : 'I want to learn this'}
                                        </p>

                                        <small>
                                            {item.skill?.category?.name ||
                                                'Uncategorized'}
                                        </small>

                                    </article>
                                ))}

                            </div>
                        )}

                </section>

                {/* Explore Section */}
                <section className="dashboard-section">

                    <div className="dashboard-section-heading">

                        <div>
                            <p className="dashboard-eyebrow">
                                DISCOVER SOMETHING NEW
                            </p>

                            <h2>Explore Your Community</h2>
                        </div>

                    </div>

                    <div className="explore-prompt">

                        <div>
                            <h3>
                                Someone in your campus knows
                                what you want to learn.
                            </h3>

                            <p>
                                Find your next learning partner today.
                            </p>
                        </div>

                        <Link
                            to="/explore"
                            className="dashboard-button"
                        >
                            Explore Skills ↗
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    )
}

export default Dashboard
