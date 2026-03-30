import Layout from '../components/Layout'
import { getPedidos } from '../services/pedidos'

function Lucro() {
  const pagos = getPedidos().filter((pedido) => pedido.status === 'pago')
  const lucroTotal = pagos.reduce((acc, pedido) => acc + pedido.lucro, 0)

  return (
    <Layout title="Lucro">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Lucro realizado</h3>
          <span>Pedidos pagos</span>
        </div>

        <div className="metric-box">R$ {lucroTotal.toFixed(2)}</div>
      </section>
    </Layout>
  )
}

export default Lucro