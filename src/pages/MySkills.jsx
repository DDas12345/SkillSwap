
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function MySkills() {
    const [teachingSkills, setTeachingSkills] = useState([])
    const [learningSkills, setLearningSkills] = useState([])

    const [teachInput, setTeachInput] = useState('')
    const [learnInput, setLearnInput] = useState('')

    const addSkill = (type) => {
        if (type === 'teach') {
            const skill = teachInput.trim()

            if (!skill || teachingSkills.includes(skill)) return

            setTeachingSkills([...teachingSkills, skill])
            setTeachInput('')
        }

        if (type === 'learn') {
            const skill = learnInput.trim()

            if (!skill || learningSkills.includes(skill)) return

            setLearningSkills([...learningSkills, skill])
            setLearnInput('')
        }
    }

    const removeSkill = (type, skillToRemove) => {
        if (type === 'teach') {
            setTeachingSkills(
                teachingSkills.filter((skill) => skill !== skillToRemove)
            )
        } else {
            setLearningSkills(
                learningSkills.filter((skill) => skill !== skillToRemove)
            )
        }
    }

    return (
        <div className="my-skills-page">

            <header className="explore-header">
                <Link to="/" className="brand">
                    <span className="brand-symbol">S</span>
                    <span>
                        skill<span className="brand-highlight">swap</span>
                    </span>
                </Link>

                <nav className="explore-nav">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/explore">Explore Skills</Link>
                </nav>
            </header>

            <main className="my-skills-main">

                <section className="my-skills-intro">
                    <p className="dashboard-eyebrow">
                        YOUR LEARNING JOURNEY
                    </p>

                    <h1>
                        Manage your <span>skills.</span>
                    </h1>

                    <p>
                        Share what you know and discover what you want to learn.
                    </p>
                </section>

                <div className="my-skills-grid">

                    {/* Skills I Can Teach */}
                    <section className="my-skills-card">
                        <div className="skills-card-heading">
                            <span className="skills-icon">🎓</span>
                            <div>
                                <h2>Skills I Can Teach</h2>
                                <p>Share your knowledge with others.</p>
                            </div>
                        </div>

                        <form
                            className="add-skill-form"
                            onSubmit={(event) => {
                                event.preventDefault()
                                addSkill('teach')
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Enter a skill you can teach..."
                                value={teachInput}
                                onChange={(event) => setTeachInput(event.target.value)}
                            />

                            <button type="submit">+ Add Skill</button>
                        </form>

                        <div className="my-skill-list">
                            {teachingSkills.length === 0 ? (
                                <p className="skills-empty">
                                    You haven't added any teaching skills yet.
                                </p>
                            ) : (
                                teachingSkills.map((skill) => (
                                    <div className="my-skill-item" key={skill}>
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill('teach', skill)}
                                            aria-label={`Remove ${skill}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Skills I Want to Learn */}
                    <section className="my-skills-card">
                        <div className="skills-card-heading">
                            <span className="skills-icon">🌱</span>
                            <div>
                                <h2>Skills I Want to Learn</h2>
                                <p>Discover new things and grow.</p>
                            </div>
                        </div>

                        <form
                            className="add-skill-form"
                            onSubmit={(event) => {
                                event.preventDefault()
                                addSkill('learn')
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Enter a skill you want to learn..."
                                value={learnInput}
                                onChange={(event) => setLearnInput(event.target.value)}
                            />

                            <button type="submit">+ Add Skill</button>
                        </form>

                        <div className="my-skill-list">
                            {learningSkills.length === 0 ? (
                                <p className="skills-empty">
                                    You haven't added any learning skills yet.
                                </p>
                            ) : (
                                learningSkills.map((skill) => (
                                    <div className="my-skill-item" key={skill}>
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill('learn', skill)}
                                            aria-label={`Remove ${skill}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                </div>

                <section className="skills-summary">
                    <h2>Your Skill Summary</h2>

                    <div className="summary-items">
                        <div>
                            <strong>{teachingSkills.length}</strong>
                            <span>Skills to Teach</span>
                        </div>

                        <div>
                            <strong>{learningSkills.length}</strong>
                            <span>Skills to Learn</span>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default MySkills
