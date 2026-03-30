import { getStorageData, saveStorageData } from './storage'

const STORAGE_KEY = 'mtss_compras'

export function getCompras() {
  return getStorageData(STORAGE_KEY)
}

export function addCompra(compra) {
  const compras = getCompras()

  const quantidade = Number(compra.quantidade)
  const valorUnitario = Number(compra.valorUnitario)
  const valorTotal = quantidade * valorUnitario

  const novaCompra = {
    id: Date.now(),
    data: compra.data,
    fornecedor: compra.fornecedor,
    produto: compra.produto,
    quantidade,
    valorUnitario,
    valorTotal,
    formaPagamento: compra.formaPagamento,
    observacao: compra.observacao || '',
    createdAt: new Date().toISOString(),
  }

  const atualizadas = [novaCompra, ...compras]
  saveStorageData(STORAGE_KEY, atualizadas)

  return novaCompra
}

export function updateCompra(id, dadosAtualizados) {
  const compras = getCompras()

  const atualizadas = compras.map((compra) => {
    if (compra.id !== id) return compra

    const quantidade = Number(dadosAtualizados.quantidade)
    const valorUnitario = Number(dadosAtualizados.valorUnitario)

    return {
      ...compra,
      ...dadosAtualizados,
      quantidade,
      valorUnitario,
      valorTotal: quantidade * valorUnitario,
    }
  })

  saveStorageData(STORAGE_KEY, atualizadas)
  return atualizadas
}

export function removeCompra(id) {
  const compras = getCompras()
  const atualizadas = compras.filter((compra) => compra.id !== id)
  saveStorageData(STORAGE_KEY, atualizadas)
  return atualizadas
}