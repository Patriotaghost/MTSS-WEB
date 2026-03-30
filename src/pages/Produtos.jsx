import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {
  addProduto,
  getProdutos,
  removeProduto,
  updateProduto,
} from '../services/produtos'

const initialForm = {
  nome: '',
  categoria: '',
  custo: '',
  precoVenda: '',
  estoque: '',
  observacao: '',
}

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)

  function loadProdutos() {
    setProdutos(getProdutos())
  }

  useEffect(() => {
    loadProdutos()
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
      updateProduto(editId, form)
    } else {
      addProduto(form)
    }

    resetForm()
    loadProdutos()
  }

  function handleEdit(produto) {
    setEditId(produto.id)
    setForm({
      nome: produto.nome,
      categoria: produto.categoria,
      custo: produto.custo,
      precoVenda: produto.precoVenda,
      estoque: produto.estoque,
      observacao: produto.observacao,
    })
  }

  function handleDelete(id) {
    removeProduto(id)
    loadProdutos()
  }

  return (
    <Layout title="Produtos">
      <section className="page-grid">
        <div className="panel-card">
          <div className="panel-card-header">
            <h3>{editId ? 'Editar produto' : 'Cadastrar produto'}</h3>
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
              <label>Categoria</label>
              <input
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Custo</label>
              <input
                type="number"
                step="0.01"
                name="custo"
                value={form.custo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Preço de Venda</label>
              <input
                type="number"
                step="0.01"
                name="precoVenda"
                value={form.precoVenda}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Estoque</label>
              <input
                type="number"
                name="estoque"
                value={form.estoque}
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
                {editId ? 'Salvar alterações' : 'Cadastrar produto'}
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
            <h3>Lista de produtos</h3>
            <span>{produtos.length} registro(s)</span>
          </div>

          <div className="table-wrap">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Custo</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      Nenhum produto cadastrado.
                    </td>
                  </tr>
                ) : (
                  produtos.map((produto) => (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>{produto.categoria}</td>
                      <td>R$ {Number(produto.custo).toFixed(2)}</td>
                      <td>R$ {Number(produto.precoVenda).toFixed(2)}</td>
                      <td>{produto.estoque}</td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-small btn-muted"
                          onClick={() => handleEdit(produto)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(produto.id)}
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

export default Produtos