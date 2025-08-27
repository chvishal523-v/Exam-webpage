import React from 'react'
import '../style/QuestionCard.css'  // import styles

export default function QuestionCard({ q, selected, onSelect }) {
  return (
    <div className="question-card">
      {/* Question */}
      <div className="question-text">{q.question}</div>

      {/* Options */}
      <div className="options">
        {q.options.map(opt => (
          <label
            key={opt}
            className={`option ${selected === opt ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`q-${q.id}`}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(q.id, opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}