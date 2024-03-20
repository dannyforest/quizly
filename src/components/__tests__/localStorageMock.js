import { vi } from "vitest";

/**
 * Generates a mock implementation of the local storage API.
 *
 * @return {Object} An object containing methods to interact with the mock local storage.
 */
export const mockLocalStorage = () => {
  const storage = {};
  return {
    getItem: vi.fn((key) => storage[key] || null),
    setItem: vi.fn((key, value) => {
      storage[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete storage[key];
    }),
    clear: vi.fn(() => {
      for (const key in storage) {
        delete storage[key];
      }
    }),
  };
};
