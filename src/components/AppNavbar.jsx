
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function AppNavbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const [isCollapsed, setIsCollapsed] = useState(
        () => localStorage.getItem('skillswap-sidebar-collapsed') === 'true'
    )

    const navigate = useNavigate()

    const closeMenu = () => setMenuOpen(false)

    const toggleCollapse = () => {
        setIsCollapsed((previous) => {
            const next = !previous
            localStorage.setItem('skillswap-sidebar-collapsed', String(next))
            return next
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate('/login', { replace: true })
    }

    return (
        <>
            <button
                type="button"
                className="app-sidebar-mobile-toggle"
                onClick={() => setMenuOpen((previous) => !previous)}
                aria-label="Toggle navigation"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : ''} ${menuOpen ? 'open' : ''}`}>
                <div className="app-sidebar-brand-row">
                    <Link
                        to="/home"
                        className="app-sidebar-brand"
                        onClick={closeMenu}
                    >
                        <span className="brand-symbol">S</span>
                        <span className="app-sidebar-brand-name">
                            skill<span className="brand-highlight">swap</span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        className="app-sidebar-collapse-toggle"
                        onClick={toggleCollapse}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? '›' : '‹'}
                    </button>
                </div>

                <p className="app-sidebar-label">MAIN MENU</p>

                <nav className="app-sidebar-nav">
                    <NavLink to="/home" onClick={closeMenu} title="Home">
                        <span>🏡</span>
                        <span className="app-sidebar-link-label">Home</span>
                    </NavLink>

                    <NavLink to="/dashboard" onClick={closeMenu} title="Dashboard">
                        <span>🏠</span>
                        <span className="app-sidebar-link-label">Dashboard</span>
                    </NavLink>

                    <NavLink to="/explore" onClick={closeMenu} title="Explore Skills">
                        <span>🔍</span>
                        <span className="app-sidebar-link-label">Explore Skills</span>
                    </NavLink>

                    <NavLink to="/my-skills" onClick={closeMenu} title="My Skills">
                        <span>✨</span>
                        <span className="app-sidebar-link-label">My Skills</span>
                    </NavLink>

                    <NavLink to="/requests" onClick={closeMenu} title="Exchange Requests">
                        <span>💌</span>
                        <span className="app-sidebar-link-label">Exchange Requests</span>
                    </NavLink>

                    <NavLink to="/profile" onClick={closeMenu} title="My Profile">
                        <span>👤</span>
                        <span className="app-sidebar-link-label">My Profile</span>
                    </NavLink>
                </nav>

                <div className="app-sidebar-footer">
                    <button type="button" onClick={handleLogout} title="Log Out">
                        <span>↪</span>
                        <span className="app-sidebar-link-label">Log Out</span>
                    </button>
                </div>
            </aside>

            {menuOpen && (
                <button
                    type="button"
                    className="app-sidebar-backdrop"
                    onClick={closeMenu}
                    aria-label="Close navigation"
                />
            )}
        </>
    )
}

export default AppNavbar
