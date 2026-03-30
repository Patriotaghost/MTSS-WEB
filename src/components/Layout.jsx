import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout({ title, children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar title={title} />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout