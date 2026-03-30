// Import: interfaces and types.
import type {Severity} from "./Severity.js";

/**
 * The `InternalErrorOptions` interface extends the properties of `BaseErrorOptions` to include must have details
 * specifically for internal error handling, such as error code, reason, severity, and target context.
 *
 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-26
 *
 * @property {boolean}  isBuiltin     - Indicates whether the error is a built-in (predefined) error.
 *
 * @example
 * // Example of an object implementing `InternalErrorOptions`:
 * const errorOptions: InternalErrorOptions = {
 *   code: 503,
 *   isBuiltin: true,
 *   reason: "connection",
 *   severity: "error",
 *   target: "database",
 * };
 */
type RequiredPredefinedErrorDetails =
{
  code:       number;
  isBuiltin:  boolean;
  reason:     string;
  severity:   Severity;
  target:     string;
}

// Export interface.
export type {RequiredPredefinedErrorDetails};