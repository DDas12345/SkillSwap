import React, { useState } from 'react'

function Offer() {
  const [skill, setSkill] = useState('')
  const [wantedSkill, setWantedSkill] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log(skill)
    console.log(wantedSkill)
    setSubmitted(true)
  }

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>What skill can you offer?</label>
        <input value={skill} onChange={(e) => setSkill(e.target.value)} />
      </div>
      <p>You are offering: {skill}</p>
      <label>What would you like to learn?</label>
      <input value={wantedSkill} onChange={(e) => setWantedSkill(e.target.value)} />
      <p>I want to learn: {wantedSkill}</p>

      <button type="submit" className="primary">
        Submit Offer
      </button>

      {submitted && (
        <div>
          <h2>Offer Submitted!</h2>
          <p>You are offering: {skill}</p>
          <p>You want to learn: {wantedSkill}</p>
        </div>
      )}
    </form>
  )
}

export default Offer