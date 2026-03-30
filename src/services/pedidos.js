import { getStorageData, saveStorageData } from './storage'
import { getClientes } from './clientes'
import { getProdutos } from './produtos'

const STORAGE_KEY = 'mtss_pedidos'

export function getPedidos() {
  return getStorageData(STORAGE_KEY)
}

export function addPedido({ clienteId, produtoId, quantidade, status, observacao }) {
  const clientes = getClientes()
  const produtos = getProdutos()

  const cliente = clientes.find((item) => String(item.id) === String(clienteId))
  const produto = produtos.find((item) => String(item.id) === String(produtoId))

  if (!cliente) {
    throw new Error('Cliente não encontrado.')
  }

  if (!produto) {
    throw new Error('Produto não encontrado.')
  }

  const qtd = Number(quantidade)
  const valorTotal = produto.precoVenda * qtd
  const custoTotal = produto.custo * qtd
  const lucro = valorTotal - custoTotal

  const pedidos = getPedidos()

  const novoPedido = {
    id: Date.now(),
    clienteId: cliente.id,
    clienteNome: cliente.nome,
    produtoId: produto.id,
    produtoNome: produto.nome,
    quantidade: qtd,
    valorUnitario: produto.precoVenda,
    custoUnitario: produto.custo,
    valorTotal,
    custoTotal,
    lucro,
    status,
    observacao: observacao || '',
    createdAt: new Date().toISOString(),
  }

  const atualizados = [novoPedido, ...pedidos]
  saveStorageData(STORAGE_KEY, atualizados)
  return novoPedido
}

export function updatePedidoStatus(id, novoStatus) {
  const pedidos = getPedidos()

  const atualizados = pedidos.map((pedido) =>
    pedido.id === id ? { ...pedido, status: novoStatus } : pedido,
  )

  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}

export function removePedido(id) {
  const pedidos = getPedidos()
  const atualizados = pedidos.filter((pedido) => pedido.id !== id)
  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}