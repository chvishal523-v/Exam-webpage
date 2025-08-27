import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import '../style/Register.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/register', { username, email, password })
      login(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed')
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account ✨</h2>
        <p className="register-subtitle">Join us and start your journey</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            className="register-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="register-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="register-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-btn">Create Account</button>
          {error && <div className="register-error">{error}</div>}
        </form>

        <p className="register-footer">
          Already have an account? <a href="/login" className="register-link">Login</a>
        </p>
      </div>
    </div>
  )
}