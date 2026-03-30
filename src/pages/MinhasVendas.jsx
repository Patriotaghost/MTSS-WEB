import Layout from '../components/Layout'
import { getPedidos } from '../services/pedidos'

function MinhasVendas() {
  const pedidos = getPedidos()

  return (
    <Layout title="Minhas Vendas">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Histórico de vendas</h3>
          <span>{pedidos.length} pedido(s)</span>
        </div>

        <div className="table-wrap">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    Nenhuma venda registrada.
                  </td>
                </tr>
              ) : (
                pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.clienteNome}</td>
                    <td>{pedido.produtoNome}</td>
                    <td>{pedido.quantidade}</td>
                    <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}

export default MinhasVendas