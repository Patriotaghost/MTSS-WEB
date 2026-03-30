import Layout from '../components/Layout'
import { getPedidos } from '../services/pedidos'

function SaldoDevedor() {
  const pendentes = getPedidos().filter((pedido) => pedido.status !== 'pago')
  const totalDevedor = pendentes.reduce((acc, pedido) => acc + pedido.valorTotal, 0)

  return (
    <Layout title="Saldo Devedor">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Total em aberto</h3>
          <span>{pendentes.length} pedido(s)</span>
        </div>

        <div className="metric-box">R$ {totalDevedor.toFixed(2)}</div>
      </section>
    </Layout>
  )
}

export default SaldoDevedor