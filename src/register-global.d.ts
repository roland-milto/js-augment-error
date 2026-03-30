// Import: interfaces and types.
import type * as functions from "./index.js";

// Make them available globally.
declare global {
  var globalThis: typeof globalThis & typeof functions;
}

export {};