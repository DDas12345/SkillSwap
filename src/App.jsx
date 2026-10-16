import './App.css'

const skills = [
  {
    icon: '💻',
    title: 'Technology',
    description: 'Python, React, web development',
    color: 'mint',
  },
  {
    icon: '🎨',
    title: 'Design & Creativity',
    description: 'UI/UX, illustration, photography',
    color: 'lavender',
  },
  {
    icon: '🗣️',
    title: 'Communication',
    description: 'Public speaking, writing, languages',
    color: 'peach',
  },
  {
    icon: '📈',
    title: 'Career & Business',
    description: 'Presentations, resumes, planning',
    color: 'blue',
  },
]

const steps = [
  {
    number: '01',
    title: 'Share what you know',
    description:
      'Create your profile and add the skills you are happy to teach.',
    icon: '✳',
  },
  {
    number: '02',
    title: 'Find your match',
    description:
      'Discover students whose skills complement what you want to learn.',
    icon: '↗',
  },
  {
    number: '03',
    title: 'Learn together',
    description:
      'Connect with your peer, exchange knowledge, and grow together.',
    icon: '♡',
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="SkillSwap home">
          <span className="brand-symbol">S</span>
          <span>skill<span className="brand-highlight">swap</span></span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#explore">Explore skills</a>
          <a href="#about">About us</a>
        </nav>

        <a className="button button-small button-dark" href="#get-started">
          Join the community <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR CAMPUS. YOUR COMMUNITY.
            </div>

            <h1>
              Your next skill is
              <br />
              already in your
              <br />
              <span className="highlight-text">community.</span>
            </h1>

            <p className="hero-description">
              You know something someone else wants to learn.
              They know something you want to know. Let's make
              those connections happen.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#explore">
                Explore skills <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-outline" href="#how-it-works">
                See how it works
              </a>
            </div>

            <div className="hero-note">
              <div className="avatar-stack" aria-hidden="true">
                <span className="avatar avatar-one">A</span>
                <span className="avatar avatar-two">R</span>
                <span className="avatar avatar-three">M</span>
              </div>
              <p>
                Built for students, <strong>powered by each other.</strong>
              </p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Illustration of a skill exchange">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="floating-label label-top">
              <span className="label-icon">✳</span>
              Knowledge goes both ways
            </div>

            <div className="match-card">
              <div className="match-card-header">
                <span className="match-status">
                  <span /> EXAMPLE MATCH
                </span>
                <span className="match-dots">•••</span>
              </div>

              <div className="student-profile">
                <div className="profile-avatar profile-maya">M</div>
                <div>
                  <h3>Maya Sharma</h3>
                  <p>Design enthusiast</p>
                </div>
                <span className="profile-check" aria-label="Sample profile">
                  ✓
                </span>
              </div>

              <div className="skill-exchange">
                <div className="exchange-column">
                  <span className="exchange-label">MAYA CAN TEACH</span>
                  <span className="skill-pill skill-purple">
                    <span aria-hidden="true">✦</span> UI/UX Design
                  </span>
                </div>

                <div className="exchange-arrow" aria-hidden="true">⇄</div>

                <div className="exchange-column">
                  <span className="exchange-label">MAYA WANTS TO LEARN</span>
                  <span className="skill-pill skill-green">
                    <span aria-hidden="true">⌘</span> Python
                  </span>
                </div>
              </div>

              <div className="match-card-footer">
                <span>Mutual learning potential</span>
                <span className="footer-star">✳</span>
              </div>
            </div>

            <div className="floating-label label-bottom">
              <span className="label-icon label-icon-green">↗</span>
              No price tag on knowledge
            </div>

            <div className="decorative-sparkle sparkle-one">✳</div>
            <div className="decorative-sparkle sparkle-two">✳</div>
          </div>
        </section>

        <section className="community-strip" id="about">
          <p>GOOD THINGS HAPPEN WHEN WE SHARE</p>
          <div>
            <span>✳ Learn together</span>
            <span>↗ Teach something</span>
            <span>♡ Grow together</span>
          </div>
        </section>

        <section className="steps-section section-container" id="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">SIMPLE BY DESIGN</p>
            <h2>
              Three steps.
              <br />
              <span className="highlight-text">A whole lot of learning.</span>
            </h2>
            <p className="section-description">
              You don't need a classroom to learn something new.
              Sometimes, all you need is the right person.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <div className="step-card-top">
                  <span className="step-number">{step.number}</span>
                  <span className="step-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="explore">
          <div className="section-container">
            <div className="skills-heading">
              <div>
                <p className="eyebrow">EVERYONE HAS SOMETHING TO SHARE</p>
                <h2>
                  What would you
                  <br />
                  <span className="highlight-text">love to learn?</span>
                </h2>
              </div>
              <p className="section-description">
                From code to creativity, your next learning
                opportunity could be one conversation away.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <div className={`skill-icon ${skill.color}`}>
                    {skill.icon}
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <a href="#get-started" className="skill-link">
                    Find a learning partner <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section section-container" id="get-started">
          <div className="cta-card">
            <div className="cta-decoration" aria-hidden="true">✳</div>
            <p className="eyebrow">YOUR KNOWLEDGE HAS VALUE</p>
            <h2>
              You have something
              <br />
              <span>worth sharing.</span>
            </h2>
            <p className="cta-description">
              Start with what you know. Leave with something new.
              That's the SkillSwap way.
            </p>
            <a className="button button-dark" href="#home">
              Be part of the community <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-symbol">S</span>
          <span>skill<span className="brand-highlight">swap</span></span>
        </a>
        <p>Made for students. Built around sharing.</p>
        <span className="footer-year">SKILLSWAP CAMPUS © 2026</span>
      </footer>
    </div>
  )
}

export default App