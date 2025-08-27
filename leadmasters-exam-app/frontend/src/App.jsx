import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Exam from './components/Exam'
import Result from './components/Result'
import { useAuth } from './context/AuthContext'
import './style/App.css'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <Link to="/" className="brand">
          LeadMasters Exam
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <span className="welcome">Hi, {user.username}</span>
              <button
                className="btn btn-outline"
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="main-content">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Exam /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/result" element={<Layout><Result /></Layout>} />
    </Routes>
  )
}