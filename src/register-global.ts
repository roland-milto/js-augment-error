// Import all functions and classes.
import * as everything from "./index.js";

// Add all functions and classes to the global scope.
for (const [name, value] of Object.entries(everything)) {
  (globalThis as Record<string, unknown>)[name] = value;
}