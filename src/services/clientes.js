import { getStorageData, saveStorageData } from './storage'

const STORAGE_KEY = 'mtss_clientes'

export function getClientes() {
  return getStorageData(STORAGE_KEY)
}

export function addCliente(cliente) {
  const clientes = getClientes()

  const novoCliente = {
    id: Date.now(),
    nome: cliente.nome,
    telefone: cliente.telefone,
    cidade: cliente.cidade,
    observacao: cliente.observacao || '',
    createdAt: new Date().toISOString(),
  }

  const atualizados = [novoCliente, ...clientes]
  saveStorageData(STORAGE_KEY, atualizados)
  return novoCliente
}

export function updateCliente(id, dadosAtualizados) {
  const clientes = getClientes()

  const atualizados = clientes.map((cliente) =>
    cliente.id === id ? { ...cliente, ...dadosAtualizados } : cliente,
  )

  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}

export function removeCliente(id) {
  const clientes = getClientes()
  const atualizados = clientes.filter((cliente) => cliente.id !== id)
  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}