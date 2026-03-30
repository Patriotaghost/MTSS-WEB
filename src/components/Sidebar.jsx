import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/clientes', label: 'Clientes' },
  { path: '/produtos', label: 'Produtos' },
  { path: '/pedidos', label: 'Pedidos' },
  { path: '/compras', label: 'Compras' },
  { path: '/valores-pagos', label: 'Valores Pagos' },
  { path: '/saldo-devedor', label: 'Saldo Devedor' },
  { path: '/minhas-vendas', label: 'Minhas Vendas' },
  { path: '/lucro', label: 'Lucro' },
  { path: '/custo', label: 'Custo' },
  { path: '/preco-venda', label: 'Preço de Venda' },
  { path: '/obs', label: 'OBS' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">$</div>
        <div>
          <h1>MTSS</h1>
          <p>Gestão comercial</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar