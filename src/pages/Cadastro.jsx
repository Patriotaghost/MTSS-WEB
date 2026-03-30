import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Cadastro() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('As senhas não conferem.')
      return
    }

    try {
      register(form.name, form.email, form.password)
      navigate('/login')
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
          <p>Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repita a senha"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="alert error">{error}</div>}

          <button type="submit" className="btn btn-primary full">
            Cadastrar
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro