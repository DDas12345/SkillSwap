import { Link } from 'react-router-dom'
import '../App.css'

function Welcome() {
    return (
        <main className="welcome-page">
            <div className="welcome-overlay">
                <div className="welcome-content">

                    <p className="welcome-university">
                        RISHIHOOD UNIVERSITY
                    </p>

                    <h1>
                        Welcome to
                        <br />
                        <span>SkillSwap Campus.</span>
                    </h1>

                    <p className="welcome-description">
                        Your campus. Your community. Your opportunity to grow.
                        Connect with fellow students, share your knowledge,
                        and discover new skills together.
                    </p>

                    <Link to="/home" className="welcome-button">
                        Let's Get Started <span>→</span>
                    </Link>

                    <p className="welcome-footer">
                        LEARN TOGETHER. GROW TOGETHER.
                    </p>

                </div>
            </div>
        </main>
    )
}

export default Welcome