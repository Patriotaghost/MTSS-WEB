import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {
  addCliente,
  getClientes,
  removeCliente,
  updateCliente,
} from '../services/clientes'

const initialForm = {
  nome: '',
  telefone: '',
  cidade: '',
  observacao: '',
}

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)

  function loadClientes() {
    setClientes(getClientes())
  }

  useEffect(() => {
    loadClientes()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function resetForm() {
    setForm(initialForm)
    setEditId(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (editId) {
      updateCliente(editId, form)
    } else {
      addCliente(form)
    }

    resetForm()
    loadClientes()
  }

  function handleEdit(cliente) {
    setEditId(cliente.id)
    setForm({
      nome: cliente.nome,
      telefone: cliente.telefone,
      cidade: cliente.cidade,
      observacao: cliente.observacao,
    })
  }

  function handleDelete(id) {
    removeCliente(id)
    loadClientes()
  }

  return (
    <Layout title="Clientes">
      <section className="page-grid">
        <div className="panel-card">
          <div className="panel-card-header">
            <h3>{editId ? 'Editar cliente' : 'Cadastrar cliente'}</h3>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                required
              />
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

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editId ? 'Salvar alterações' : 'Cadastrar cliente'}
              </button>

              {editId && (
                <button type="button" className="btn btn-muted" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <h3>Lista de clientes</h3>
            <span>{clientes.length} registro(s)</span>
          </div>

          <div className="table-wrap">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-row">
                      Nenhum cliente cadastrado.
                    </td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cliente.telefone}</td>
                      <td>{cliente.cidade}</td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-small btn-muted"
                          onClick={() => handleEdit(cliente)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(cliente.id)}
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

export default Clientes