import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-logo big">$</div>
          <h1>MTSS</h1>
          <p>Acesse sua gestão comercial</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="alert error">{error}</div>}

          <button type="submit" className="btn btn-primary full">
            Entrar
          </button>
        </form>

        <p className="auth-footer">
          Não tem conta? <Link to="/cadastro">Criar cadastro</Link>
        </p>
      </div>
    </div>
  )
}

export default Login