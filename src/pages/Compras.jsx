import Layout from '../components/Layout'
import { getProdutos } from '../services/produtos'

function Compras() {
  const produtos = getProdutos()
  const totalInvestido = produtos.reduce(
    (acc, produto) => acc + Number(produto.custo) * Number(produto.estoque),
    0,
  )

  return (
    <Layout title="Compras">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Investimento em estoque</h3>
          <span>Baseado em custo x estoque</span>
        </div>

        <div className="metric-box">R$ {totalInvestido.toFixed(2)}</div>
      </section>
    </Layout>
  )
}

export default Compras