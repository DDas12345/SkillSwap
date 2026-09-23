import React from 'react'

function Navbar() {
    return (
        <nav>
            <h2>SkillSwap</h2>
            <div className="nav-links">
                <a href="/explore">Explore</a>
                <a href="/offer">Offer a Skill</a>
                <button>Login</button>
            </div>
        </nav>
    )
}

export default Navbar