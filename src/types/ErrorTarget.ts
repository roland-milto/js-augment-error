// Import: local constants.
import {ERROR_TARGET_REASON_MAP} from "../data/constants/ERROR_TARGET_REASON_MAP.js";

/**
 * `ErrorTarget` represents the keys of the `ERROR_TARGET_REASON_MAP` object.
 * This type ensures that only valid keys from the map can be used.

 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-10

 * @example
 * // Assuming that:
 * ERROR_TARGET_REASON_MAP = {
 *  user: "invalid"
 * }
 *
 * let target: ErrorTarget;
 *
 * // Valid key
 * target = "user";
 *
 * // TypeScript error: Type '"unknown"' is not assignable to type 'ErrorTarget'.
 * target = "unknown";
 */
type ErrorTarget = keyof typeof ERROR_TARGET_REASON_MAP;

// Export type.
export type {ErrorTarget};