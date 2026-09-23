import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="hero">
            <h1>SkillSwap</h1>
            <p>Exchange skills. Share knowledge.</p>

            <div className="actions">
                <Link className="primary" to="/explore">
                    Explore Skills
                </Link>
                <Link className="secondary" to="/offer">
                    Offer a Skill
                </Link>
            </div>
        </div>
    )
}

export default Home