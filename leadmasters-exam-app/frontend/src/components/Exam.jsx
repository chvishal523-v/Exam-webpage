import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import QuestionCard from './QuestionCard'
import { useAuth } from '../context/AuthContext'
import '../style/Exam.css'

export default function Exam() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [stage, setStage] = useState('idle') // idle | loading | active
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [idx, setIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)

  const handleStart = async () => {
    if (!user) return
    setStage('loading')
    try {
      const { data } = await api.get('/api/exam/start')
      setQuestions(data.questions || [])
      setTimeLeft(data.durationSeconds ?? 30 * 60)
      setAnswers({})
      setIdx(0)
      setStage('active')
    } catch (e) {
      console.error(e)
      alert('Failed to start exam')
      setStage('idle')
    }
  }

  useEffect(() => {
    if (stage !== 'active' || timeLeft == null) return
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(t)
  }, [stage, timeLeft])

  const handleSelect = (qid, opt) => {
    setAnswers(prev => ({ ...prev, [qid]: opt }))
  }

  const current = useMemo(() => questions[idx] || null, [questions, idx])

  const next = () => setIdx(i => Math.min(i + 1, questions.length - 1))
  const prev = () => setIdx(i => Math.max(i - 1, 0))

  const format = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  const handleSubmit = async () => {
    try {
      const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption }))
      if (payload.length === 0) {
        if (!window.confirm('You have not answered any question. Submit anyway?')) return
      }
      const { data } = await api.post('/api/exam/submit', { answers: payload })
      navigate('/result', { state: data })
    } catch (e) {
      console.error(e)
      alert('Failed to submit')
    }
  }

  if (!user) {
    return (
      <div className="exam-wrapper">
        <h2>Please log in to start the exam</h2>
      </div>
    )
  }

  if (stage === 'idle') {
    return (
      <div className="exam-wrapper">
        <h2 className="exam-title">LeadMasters Assessment</h2>
        <p className="exam-desc">Click below to begin. You’ll have 30 minutes, and the timer will start immediately.</p>
        <button className="primary-btn" onClick={handleStart}>Start Exam</button>
      </div>
    )
  }

  if (stage === 'loading') {
    return <div className="exam-wrapper">Loading questions…</div>
  }

  // stage === 'active'
  return (
    <div className="exam-wrapper">
      <div className="exam-header">
        <div>Question {idx + 1} / {questions.length}</div>
        <div className="exam-timer">⏳ {format(timeLeft ?? 0)}</div>
      </div>

      {current && (
        <QuestionCard
          key={current.id}
          q={current}
          selected={answers[current.id]}
          onSelect={handleSelect}
        />
      )}

      <div className="exam-controls">
        <button className="secondary-btn" onClick={prev} disabled={idx === 0}>Previous</button>
        <div className="exam-actions">
          <button className="secondary-btn" onClick={next} disabled={idx === questions.length - 1}>Next</button>
          <button className="primary-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}