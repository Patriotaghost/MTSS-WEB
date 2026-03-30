import { getStorageData, saveStorageData } from './storage'

const STORAGE_KEY = 'mtss_produtos'

export function getProdutos() {
  return getStorageData(STORAGE_KEY)
}

export function addProduto(produto) {
  const produtos = getProdutos()

  const novoProduto = {
    id: Date.now(),
    nome: produto.nome,
    categoria: produto.categoria,
    custo: Number(produto.custo),
    precoVenda: Number(produto.precoVenda),
    estoque: Number(produto.estoque || 0),
    observacao: produto.observacao || '',
    createdAt: new Date().toISOString(),
  }

  const atualizados = [novoProduto, ...produtos]
  saveStorageData(STORAGE_KEY, atualizados)
  return novoProduto
}

export function updateProduto(id, dadosAtualizados) {
  const produtos = getProdutos()

  const atualizados = produtos.map((produto) =>
    produto.id === id
      ? {
          ...produto,
          ...dadosAtualizados,
          custo: Number(dadosAtualizados.custo),
          precoVenda: Number(dadosAtualizados.precoVenda),
          estoque: Number(dadosAtualizados.estoque),
        }
      : produto,
  )

  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}

export function removeProduto(id) {
  const produtos = getProdutos()
  const atualizados = produtos.filter((produto) => produto.id !== id)
  saveStorageData(STORAGE_KEY, atualizados)
  return atualizados
}