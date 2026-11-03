import { Link } from 'react-router-dom'
import '../App.css'

function Dashboard() {
    return (
        <div className="dashboard-page">

            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    <span className="brand-symbol">S</span>
                    <span>
                        skill<span className="brand-highlight">swap</span>
                    </span>
                </div>

                <nav className="dashboard-nav">
                    <Link to="/dashboard" className="active">
                        🏠 Dashboard
                    </Link>

                    <Link to="/explore">
                        🔍 Explore Skills
                    </Link>

                    <Link to="/my-skills">
                        ✨ My Skills
                    </Link>

                    <Link to="/requests">
                        💌 Exchange Requests
                    </Link>

                    <Link to="/profile">
                        👤 My Profile
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <Link to="/">↩ Back to Home</Link>
                    <Link to="/login">Log Out</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-eyebrow">YOUR LEARNING SPACE</p>
                        <h1>Welcome back, Student! 👋</h1>
                        <p>Ready to learn something new today?</p>
                    </div>

                    <div className="dashboard-avatar">S</div>
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
                            <p className="dashboard-eyebrow">YOUR KNOWLEDGE</p>
                            <h2>My Skills</h2>
                        </div>

                        <Link to="/my-skills">Manage Skills ↗</Link>
                    </div>

                    <div className="empty-state">
                        <span>🌌</span>
                        <h3>Your learning universe starts here.</h3>
                        <p>
                            Add skills you can teach and skills you want to learn.
                        </p>

                        <Link to="/my-skills" className="dashboard-button">
                            Add Your Skills ↗
                        </Link>
                    </div>
                </section>

                {/* Explore Section */}
                <section className="dashboard-section">
                    <div className="dashboard-section-heading">
                        <div>
                            <p className="dashboard-eyebrow">DISCOVER SOMETHING NEW</p>
                            <h2>Explore Your Community</h2>
                        </div>
                    </div>

                    <div className="explore-prompt">
                        <div>
                            <h3>Someone in your campus knows what you want to learn.</h3>
                            <p>Find your next learning partner today.</p>
                        </div>

                        <Link to="/explore" className="dashboard-button">
                            Explore Skills ↗
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Dashboard