
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function MySkills() {
    const [teachingSkills, setTeachingSkills] = useState([])
    const [learningSkills, setLearningSkills] = useState([])

    const [teachInput, setTeachInput] = useState('')
    const [learnInput, setLearnInput] = useState('')

    // API loading and error states
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch skills when the page loads
    useEffect(() => {
        const fetchMySkills = async () => {
            try {
                const token = localStorage.getItem('accessToken')

                if (!token) {
                    throw new Error('Please log in to view your skills.')
                }

                const response = await fetch('http://localhost:5001/api/skills', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load skills.')
                }

                setTeachingSkills(
                    data.skills.filter((skill) => skill.type === 'TEACHING')
                )

                setLearningSkills(
                    data.skills.filter((skill) => skill.type === 'LEARNING')
                )

            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMySkills()
    }, [])

    // Add a skill through the backend API
    const addSkill = async (type) => {
        const skill = type === 'teach'
            ? teachInput.trim()
            : learnInput.trim()

        if (!skill) return

        try {
            setError('')

            const token = localStorage.getItem('accessToken')

            if (!token) {
                throw new Error('Please log in to add a skill.')
            }

            const response = await fetch('http://localhost:5001/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: skill,
                    type: type === 'teach' ? 'TEACHING' : 'LEARNING'
                })
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to add skill.')
            }

            // Fetch the updated skill list
            const updatedResponse = await fetch('http://localhost:5001/api/skills', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const updatedData = await updatedResponse.json()

            if (!updatedResponse.ok) {
                throw new Error(updatedData.message || 'Could not refresh skills.')
            }

            setTeachingSkills(
                updatedData.skills.filter((item) => item.type === 'TEACHING')
            )

            setLearningSkills(
                updatedData.skills.filter((item) => item.type === 'LEARNING')
            )

            if (type === 'teach') {
                setTeachInput('')
            } else {
                setLearnInput('')
            }

        } catch (err) {
            setError(err.message)
        }
    }

    // Delete a skill through the backend API
    const removeSkill = async (type, skillId) => {
        try {
            setError('')

            const token = localStorage.getItem('accessToken')

            if (!token) {
                throw new Error('Please log in to remove a skill.')
            }

            const response = await fetch(
                `http://localhost:5001/api/skills/${skillId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to remove skill.')
            }

            if (type === 'teach') {
                setTeachingSkills((previousSkills) =>
                    previousSkills.filter((skill) => skill.id !== skillId)
                )
            } else {
                setLearningSkills((previousSkills) =>
                    previousSkills.filter((skill) => skill.id !== skillId)
                )
            }

        } catch (err) {
            setError(err.message)
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

                {error && (
                    <p className="skills-empty" role="alert">
                        {error}
                    </p>
                )}

                {isLoading ? (
                    <p className="skills-empty">
                        Loading your skills...
                    </p>
                ) : (
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
                                        <div className="my-skill-item" key={skill.id}>
                                            <span>{skill.skill.name}</span>

                                            <button
                                                type="button"
                                                onClick={() => removeSkill('teach', skill.id)}
                                                aria-label={`Remove ${skill.skill.name}`}
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
                                        <div className="my-skill-item" key={skill.id}>
                                            <span>{skill.skill.name}</span>

                                            <button
                                                type="button"
                                                onClick={() => removeSkill('learn', skill.id)}
                                                aria-label={`Remove ${skill.skill.name}`}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                    </div>
                )}

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
