import { vi } from 'vitest'

export const mockLocalStorage = () => {
  const storage = {}
  return {
    getItem: vi.fn((key) => storage[key] || null),
    setItem: vi.fn((key, value) => {
      storage[key] = value.toString()
    }),
    removeItem: vi.fn((key) => {
      delete storage[key]
    }),
    clear: vi.fn(() => {
      for (const key in storage) {
        delete storage[key]
      }
    })
  }
}
