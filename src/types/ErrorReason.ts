// Import: interfaces and types.
import type {ErrorTargetReasonMap} from "./ErrorTargetReasonMap.js";

/**
 * `ErrorReason` is a type that represents a reason for an error, derived from a specific error target
 * defined in the `ERROR_TARGET_REASON_MAP`. It is linked to a target and its associated reasons.
 *
 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-10
 *
 * @returns {string} - A string representing the reason for the error.
 *                    e.g., "limit" | "notFound" | "request" | "forbidden" | "permission" | ...
 *
 * @example
 * // Assuming "connection" is a valid reason for a target.
 * const reason: ErrorReason = "connection";
 *
 * // Assuming "notFound" is allowed for the specified target.
 * const anotherReason: ErrorReason = "notFound";
 */
type ErrorReason<T extends keyof ErrorTargetReasonMap> = ErrorTargetReasonMap[T];

// Export type.
export type {ErrorReason};