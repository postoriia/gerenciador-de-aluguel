const getItem = <T = unknown>(key: string): T | null => {
  const value = window.localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

const setItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

const clear = () => {
  window.localStorage.clear()
}

export { getItem, setItem, removeItem, clear }
