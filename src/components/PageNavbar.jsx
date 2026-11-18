import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Explore', path: '/explore', icon: '🔍' },
    { label: 'My Skills', path: '/my-skills', icon: '✨' },
    { label: 'Requests', path: '/requests', icon: '💌' },
    { label: 'Profile', path: '/profile', icon: '👤' },
]

function PageNavbar() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="page-navbar">
            <Link
                to="/home"
                className="page-navbar-brand"
                onClick={() => setIsMenuOpen(false)}
            >
                <span className="brand-symbol">S</span>
                <span>
                    skill<span className="brand-highlight">swap</span>
                </span>
            </Link>

            <button
                type="button"
                className="page-navbar-toggle"
                onClick={() => setIsMenuOpen((previous) => !previous)}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            <nav
                className={`page-navbar-links ${isMenuOpen ? 'open' : ''}`}
                aria-label="Main navigation"
            >
                {navigationItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={
                            location.pathname === item.path ? 'active' : ''
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    )
}

export default PageNavbar