// Import: internal constants.
import {SEVERITY} from "../data/constants/SEVERITY.js";

/**
 * @type Severity
 *
 * Represents the severity of a message or event and is used to define
 * the level of importance or urgency of a given context.
 *
 * It can be one of the following predefined string values:
 * - `critical`: Indicates a very severe issue that requires immediate attention and may impact the whole system.
 * - `debug`: Represents detailed diagnostic information for development and troubleshooting.
 * - `error`: Indicates a severe issue that requires immediate attention.
 * - `fatal`: Denotes a critical, non-recoverable error that usually causes the current process or operation to stop.
 * - `info`: Represents an informational message.
 * - `success`: Denotes a successful operation or result.
 * - `warning`: Signals a warning that doesn't prevent operation but may require caution.
 *
 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-25
 *
 @example
 * // A critical system failure.
 * const severity1: Severity = "critical";
 *
 * // Debug output for development.
 * const severity2: Severity = "debug";
 *
 * // A recoverable error.
 * const severity3: Severity = "error";
 */
type Severity = typeof SEVERITY[number];

// Export type.
export type {Severity};