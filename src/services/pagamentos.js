import { getStorageData, saveStorageData } from './storage'

const STORAGE_KEY = 'mtss_valores_pagos'

export function getPagamentos() {
  return getStorageData(STORAGE_KEY)
}

export function addPagamento(pagamento) {
  const pagamentos = getPagamentos()

  const novoPagamento = {
    id: Date.now(),
    ...pagamento,
  }

  const atualizados = [...pagamentos, novoPagamento]
  saveStorageData(STORAGE_KEY, atualizados)

  return novoPagamento
}

export function removePagamento(id) {
  const pagamentos = getPagamentos()
  const atualizados = pagamentos.filter((pagamento) => pagamento.id !== id)

  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}

export function updatePagamento(id, dadosAtualizados) {
  const pagamentos = getPagamentos()

  const atualizados = pagamentos.map((pagamento) =>
    pagamento.id === id ? { ...pagamento, ...dadosAtualizados } : pagamento
  )

  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}

/* Compatibilidade com nomes antigos */
export const listarPagamentos = getPagamentos
export const cadastrarPagamento = addPagamento
export const excluirPagamento = removePagamento
export const removerPagamento = removePagamento
export const atualizarPagamento = updatePagamento
export const listarValoresPagos = getPagamentos
export const cadastrarValorPago = addPagamento