import "@testing-library/jest-dom";
Object.defineProperty(global.navigator, "clipboard", {
  value: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
  configurable: true,
});

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock();
