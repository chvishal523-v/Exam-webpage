import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import '../style/Login.css'   // Import CSS

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { emailOrUsername, password })
      login(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back </h2>
        <p className="login-subtitle">Please log in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={e => setEmailOrUsername(e.target.value)}
            className="login-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          {error && <div className="login-error">{error}</div>}
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/register" className="login-link">Sign up</a>
        </p>
      </div>
    </div>
  )
}