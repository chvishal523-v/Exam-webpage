import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import '../style/Result.css'

export default function Result() {
  const { state } = useLocation()
  if (!state) return <div>No results to show. <Link to="/">Go Home</Link></div>

  return (
    <div className="result-container">
      <h2 className="result-title">Your Result</h2>
      <div className="score-box">
        Score: <b>{state.score}</b> / {state.total}
      </div>

      <details className="details-box">
        <summary className="details-summary">Show Answer Details</summary>
        <ul className="answer-list">
          {state.details.map((d, idx) => (
            <li
              key={idx}
              className={`answer-item ${d.isCorrect ? 'correct' : 'wrong'}`}
            >
              <div className="question-id">
                Q{d.questionId}
              </div>
              {d.question && (
                <div className="question-text">
                  {d.question}
                </div>
              )}
              <div>
                <span className="label">Your Answer:</span> {d.selected || '—'}
              </div>
              <div>
                <span className="label">Correct:</span> {d.correct}
              </div>
              <div className="icon">
                {d.isCorrect ? '✅' : '❌'}
              </div>
            </li>
          ))}
        </ul>
      </details>

      <div className="back-home">
        <Link to="/">⬅ Back to Exam</Link>
      </div>
    </div>
  )
}