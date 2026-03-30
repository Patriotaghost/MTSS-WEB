import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getClientes } from '../services/clientes'
import { getProdutos } from '../services/produtos'
import {
  addPedido,
  getPedidos,
  removePedido,
  updatePedidoStatus,
} from '../services/pedidos'

const initialForm = {
  clienteId: '',
  produtoId: '',
  quantidade: 1,
  status: 'pendente',
  observacao: '',
}

function Pedidos() {
  const [clientes, setClientes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  function loadData() {
    setClientes(getClientes())
    setProdutos(getProdutos())
    setPedidos(getPedidos())
  }

  useEffect(() => {
    loadData()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      addPedido(form)
      setForm(initialForm)
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  function handleDelete(id) {
    removePedido(id)
    loadData()
  }

  function handleChangeStatus(id, status) {
    updatePedidoStatus(id, status)
    loadData()
  }

  return (
    <Layout title="Pedidos">
      <section className="page-grid">
        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Criar pedido</h3>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Cliente</label>
              <select
                name="clienteId"
                value={form.clienteId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Produto</label>
              <select
                name="produtoId"
                value={form.produtoId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quantidade</label>
              <input
                type="number"
                min="1"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </div>

            <div className="form-group full-grid">
              <label>Observação</label>
              <textarea
                name="observacao"
                rows="4"
                value={form.observacao}
                onChange={handleChange}
              />
            </div>

            {error && <div className="alert error full-grid">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Criar pedido
              </button>
            </div>
          </form>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Lista de pedidos</h3>
            <span>{pedidos.length} registro(s)</span>
          </div>

          <div className="table-wrap">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      Nenhum pedido cadastrado.
                    </td>
                  </tr>
                ) : (
                  pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.clienteNome}</td>
                      <td>{pedido.produtoNome}</td>
                      <td>{pedido.quantidade}</td>
                      <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${pedido.status}`}>
                          {pedido.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-small btn-muted"
                          onClick={() => handleChangeStatus(pedido.id, 'pago')}
                        >
                          Marcar pago
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(pedido.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Pedidos