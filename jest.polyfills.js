const TextDecoder = require("util").TextDecoder;
const TextEncoder = require("util").TextEncoder;

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder;
}

global.IntersectionObserver = class {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.root = options.root || null;
    this.rootMargin = options.rootMargin || "";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold || 0];
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
