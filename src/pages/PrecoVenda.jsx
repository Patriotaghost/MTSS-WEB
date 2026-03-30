import Layout from '../components/Layout'
import { getProdutos } from '../services/produtos'

function PrecoVenda() {
  const produtos = getProdutos()

  return (
    <Layout title="Preço de Venda">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Tabela de preços</h3>
          <span>{produtos.length} produto(s)</span>
        </div>

        <div className="table-wrap">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço de Venda</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-row">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.categoria}</td>
                    <td>R$ {Number(produto.precoVenda).toFixed(2)}</td>
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

export default PrecoVenda