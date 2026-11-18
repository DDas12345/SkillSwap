import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function Dashboard() {
    const navigate = useNavigate()
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    // Get the logged-in user's information
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')

        navigate('/', { replace: true })
    }

    const userName = user.fullName || 'Student'
    const userInitial = userName.charAt(0).toUpperCase()

    return (
        <div className="dashboard-page">

            {/* Sidebar */}
            <aside
                className={`dashboard-sidebar ${isSidebarCollapsed ? 'collapsed' : ''
                    } ${isMobileSidebarOpen ? 'mobile-open' : ''}`}
            >

                <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={() => setIsSidebarCollapsed((previous) => !previous)}
                    aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-expanded={!isSidebarCollapsed}
                >
                    {isSidebarCollapsed ? '☰' : '←'}
                </button>

                <div className="dashboard-brand">
                    <span className="brand-symbol">S</span>
                    <span>
                        skill<span className="brand-highlight">swap</span>
                    </span>
                </div>

                <nav className="dashboard-nav">

                    <Link to="/dashboard" className="active" title="Dashboard">
                        <span className="sidebar-link-icon">🏠</span>
                        <span className="sidebar-link-label">Dashboard</span>
                    </Link>

                    <Link to="/explore" title="Explore Skills">
                        <span className="sidebar-link-icon">🔍</span>
                        <span className="sidebar-link-label">Explore Skills</span>
                    </Link>

                    <Link to="/my-skills" title="My Skills">
                        <span className="sidebar-link-icon">✨</span>
                        <span className="sidebar-link-label">My Skills</span>
                    </Link>

                    <Link to="/requests" title="Exchange Requests">
                        <span className="sidebar-link-icon">💌</span>
                        <span className="sidebar-link-label">Exchange Requests</span>
                    </Link>

                    <Link to="/profile" title="My Profile">
                        <span className="sidebar-link-icon">👤</span>
                        <span className="sidebar-link-label">My Profile</span>
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <Link to="/">
                        ↩ Back to Home
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="dashboard-logout"
                    >
                        ↪ Log Out
                    </button>

                </div>

            </aside>

            {isMobileSidebarOpen && (
                <button
                    type="button"
                    className="mobile-sidebar-backdrop"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    aria-label="Close navigation menu"
                />
            )}

            {/* Main Content */}
            <main className="dashboard-main">

                <button
                    type="button"
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileSidebarOpen((previous) => !previous)}
                    aria-label={isMobileSidebarOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileSidebarOpen}
                >
                    {isMobileSidebarOpen ? '✕' : '☰'}
                </button>

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
                        <h2>0</h2>
                        <p>Skills Teaching</p>
                    </article>

                    <article className="stat-card">
                        <span>📚</span>
                        <h2>0</h2>
                        <p>Skills Learning</p>
                    </article>

                    <article className="stat-card">
                        <span>🤝</span>
                        <h2>0</h2>
                        <p>Skill Matches</p>
                    </article>

                    <article className="stat-card">
                        <span>💌</span>
                        <h2>0</h2>
                        <p>Pending Requests</p>
                    </article>

                </section>

                {/* Skills Section */}
                <section className="dashboard-section">

                    <div className="dashboard-section-heading">

                        <div>
                            <p className="dashboard-eyebrow">
                                YOUR KNOWLEDGE
                            </p>

                            <h2>My Skills</h2>
                        </div>

                    </div>

                    <div className="empty-state">

                        <span>🌌</span>

                        <h3>
                            Your learning universe starts here.
                        </h3>

                        <p>
                            Add skills you can teach and skills you want to learn.
                        </p>

                        <Link
                            to="/my-skills"
                            className="dashboard-button"
                        >
                            Add Your Skills ↗
                        </Link>

                    </div>

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
                                Someone in your campus knows what you want to learn.
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
