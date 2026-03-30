import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Topbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>Dashboard profissional da MTSS</p>
      </div>

      <div className="topbar-actions">
        <div className="topbar-user">
          <span className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'M'}
          </span>
          <div>
            <strong>{user?.name || 'Gestor'}</strong>
            <small>{user?.email || 'Usuário logado'}</small>
          </div>
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  )
}

export default Topbar