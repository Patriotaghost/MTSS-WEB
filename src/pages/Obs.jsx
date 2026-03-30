import Layout from '../components/Layout'
import { getPedidos } from '../services/pedidos'
import { getClientes } from '../services/clientes'
import { getProdutos } from '../services/produtos'

function Obs() {
  const pedidos = getPedidos().filter((item) => item.observacao)
  const clientes = getClientes().filter((item) => item.observacao)
  const produtos = getProdutos().filter((item) => item.observacao)

  return (
    <Layout title="OBS">
      <section className="page-grid">
        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Observações de clientes</h3>
          </div>
          <div className="notes-list">
            {clientes.length === 0 ? (
              <p className="empty-text">Nenhuma observação de cliente.</p>
            ) : (
              clientes.map((item) => (
                <div key={item.id} className="note-card">
                  <strong>{item.nome}</strong>
                  <p>{item.observacao}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Observações de produtos</h3>
          </div>
          <div className="notes-list">
            {produtos.length === 0 ? (
              <p className="empty-text">Nenhuma observação de produto.</p>
            ) : (
              produtos.map((item) => (
                <div key={item.id} className="note-card">
                  <strong>{item.nome}</strong>
                  <p>{item.observacao}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Observações de pedidos</h3>
          </div>
          <div className="notes-list">
            {pedidos.length === 0 ? (
              <p className="empty-text">Nenhuma observação de pedido.</p>
            ) : (
              pedidos.map((item) => (
                <div key={item.id} className="note-card">
                  <strong>
                    {item.clienteNome} - {item.produtoNome}
                  </strong>
                  <p>{item.observacao}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Obs