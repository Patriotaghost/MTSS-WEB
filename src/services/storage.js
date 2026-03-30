export function getStorageData(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}