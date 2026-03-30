import Layout from '../components/Layout'
import { getCompras } from '../services/compras'

function Custo() {
  const compras = getCompras()
  const custoTotal = compras.reduce(
    (acc, compra) => acc + Number(compra.valorTotal),
    0,
  )

  return (
    <Layout title="Custo">
      <section className="panel-card">
        <div className="panel-card-header">
          <h3>Custo total</h3>
          <span>Baseado nas compras cadastradas</span>
        </div>

        <div className="metric-box">R$ {custoTotal.toFixed(2)}</div>
      </section>
    </Layout>
  )
}

export default Custo