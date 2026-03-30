import { useMemo } from 'react'
import Layout from '../components/Layout'
import { getClientes } from '../services/clientes'
import { getProdutos } from '../services/produtos'
import { getPedidos } from '../services/pedidos'
import { getCompras } from '../services/compras'

function Home() {
  const clientes = getClientes()
  const produtos = getProdutos()
  const pedidos = getPedidos()
  const compras = getCompras()

  const resumo = useMemo(() => {
    const totalVendas = pedidos.reduce((acc, pedido) => acc + Number(pedido.valorTotal), 0)

    const totalLucro = pedidos
      .filter((pedido) => pedido.status === 'pago')
      .reduce((acc, pedido) => acc + Number(pedido.lucro), 0)

    const pedidosAbertos = pedidos.filter((pedido) => pedido.status !== 'pago').length

    const totalComprado = compras.reduce(
      (acc, compra) => acc + Number(compra.valorTotal),
      0,
    )

    const ultimoFornecedor = compras.length > 0 ? compras[0].fornecedor : 'Nenhum'

    const ultimasCompras = compras.slice(0, 5)

    return {
      totalVendas,
      totalLucro,
      pedidosAbertos,
      totalClientes: clientes.length,
      totalProdutos: produtos.length,
      totalPedidos: pedidos.length,
      totalComprado,
      ultimoFornecedor,
      ultimasCompras,
    }
  }, [clientes, produtos, pedidos, compras])

  return (
    <Layout title="Dashboard">
      <section className="hero-panel">
        <div>
          <span className="badge-status">Sistema em funcionamento</span>
          <h1>Controle profissional da MTSS</h1>
          <p>
            Visualize clientes, produtos, pedidos, compras, lucro e saldo devedor
            em um painel moderno, limpo e funcional.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Vendas totais</span>
          <strong>R$ {resumo.totalVendas.toFixed(2)}</strong>
          <small>Baseado em todos os pedidos</small>
        </div>

        <div className="stat-card">
          <span>Lucro realizado</span>
          <strong>R$ {resumo.totalLucro.toFixed(2)}</strong>
          <small>Somente pedidos pagos</small>
        </div>

        <div className="stat-card">
          <span>Clientes cadastrados</span>
          <strong>{resumo.totalClientes}</strong>
          <small>Total atual</small>
        </div>

        <div className="stat-card">
          <span>Pedidos em aberto</span>
          <strong>{resumo.pedidosAbertos}</strong>
          <small>Pendentes ou atrasados</small>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total comprado</span>
          <strong>R$ {resumo.totalComprado.toFixed(2)}</strong>
          <small>Soma de todas as compras</small>
        </div>

        <div className="stat-card">
          <span>Último fornecedor</span>
          <strong>{resumo.ultimoFornecedor}</strong>
          <small>Último registro em compras</small>
        </div>

        <div className="stat-card">
          <span>Produtos cadastrados</span>
          <strong>{resumo.totalProdutos}</strong>
          <small>Total atual no sistema</small>
        </div>

        <div className="stat-card">
          <span>Total de pedidos</span>
          <strong>{resumo.totalPedidos}</strong>
          <small>Histórico geral</small>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Resumo geral</h3>
            <span>MTSS</span>
          </div>

          <div className="summary-list">
            <div className="summary-row">
              <span>Total de produtos</span>
              <strong>{resumo.totalProdutos}</strong>
            </div>

            <div className="summary-row">
              <span>Total de pedidos</span>
              <strong>{resumo.totalPedidos}</strong>
            </div>

            <div className="summary-row">
              <span>Total comprado</span>
              <strong>R$ {resumo.totalComprado.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Status do sistema</span>
              <strong>Operando</strong>
            </div>
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Últimas compras</h3>
            <span>{resumo.ultimasCompras.length} item(ns)</span>
          </div>

          {resumo.ultimasCompras.length === 0 ? (
            <div className="panel-placeholder">
              Nenhuma compra cadastrada ainda.
            </div>
          ) : (
            <div className="recent-list">
              {resumo.ultimasCompras.map((compra) => (
                <div key={compra.id} className="recent-item">
                  <div>
                    <strong>{compra.produto}</strong>
                    <p>
                      {compra.fornecedor} • {compra.data}
                    </p>
                  </div>
                  <span>R$ {Number(compra.valorTotal).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Home