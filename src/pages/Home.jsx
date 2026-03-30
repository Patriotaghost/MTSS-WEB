import { useMemo } from 'react'
import {
  Wallet,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  Truck,
  ClipboardList,
  BarChart3,
} from 'lucide-react'
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
    const totalVendas = pedidos.reduce((acc, pedido) => acc + Number(pedido.valorTotal || 0), 0)

    const totalLucro = pedidos
      .filter((pedido) => pedido.status === 'pago')
      .reduce((acc, pedido) => acc + Number(pedido.lucro || 0), 0)

    const pedidosAbertos = pedidos.filter((pedido) => pedido.status !== 'pago').length

    const totalComprado = compras.reduce(
      (acc, compra) => acc + Number(compra.valorTotal || 0),
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
          <h1>Dashboard</h1>
          <p>
            Visualize clientes, produtos, pedidos, compras, lucro e saldo devedor
            em um painel moderno, limpo e funcional.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Wallet size={20} />
            </div>
            <span>Vendas totais</span>
          </div>
          <strong>R$ {resumo.totalVendas.toFixed(2)}</strong>
          <small>Baseado em todos os pedidos</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <TrendingUp size={20} />
            </div>
            <span>Lucro realizado</span>
          </div>
          <strong>R$ {resumo.totalLucro.toFixed(2)}</strong>
          <small>Somente pedidos pagos</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Users size={20} />
            </div>
            <span>Clientes cadastrados</span>
          </div>
          <strong>{resumo.totalClientes}</strong>
          <small>Total atual</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <ShoppingCart size={20} />
            </div>
            <span>Pedidos em aberto</span>
          </div>
          <strong>{resumo.pedidosAbertos}</strong>
          <small>Pendentes ou atrasados</small>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <BarChart3 size={20} />
            </div>
            <span>Total comprado</span>
          </div>
          <strong>R$ {resumo.totalComprado.toFixed(2)}</strong>
          <small>Soma de todas as compras</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Truck size={20} />
            </div>
            <span>Último fornecedor</span>
          </div>
          <strong>{resumo.ultimoFornecedor}</strong>
          <small>Último registro em compras</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Package size={20} />
            </div>
            <span>Produtos cadastrados</span>
          </div>
          <strong>{resumo.totalProdutos}</strong>
          <small>Total atual no sistema</small>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <ClipboardList size={20} />
            </div>
            <span>Total de pedidos</span>
          </div>
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
                  <span>R$ {Number(compra.valorTotal || 0).toFixed(2)}</span>
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