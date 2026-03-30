import Layout from '../components/Layout'
import { getPedidos } from '../services/pedidos'

function ValoresPagos() {
  const pedidosPagos = getPedidos().filter((pedido) => pedido.status === 'pago')
  const totalPago = pedidosPagos.reduce((acc, pedido) => acc + pedido.valorTotal, 0)

  return (
    <Layout title="Valores Pagos">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Total recebido</h3>
          <span>{pedidosPagos.length} pedido(s) pagos</span>
        </div>

        <div className="metric-box">R$ {totalPago.toFixed(2)}</div>
      </section>
    </Layout>
  )
}

export default ValoresPagos