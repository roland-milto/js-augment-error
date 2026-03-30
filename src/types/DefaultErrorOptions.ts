/**
 * Represents an extended error object used for tracking and handling application errors.
 *
 * @author  Roland Milto
 * @version 2026-02-16
 *
 * @property {unknown}          [cause]     - The underlying reason or origin of the error.
 * @property {number | string}  [code]      - The error code or status associated with the error.
 * @property {number}           [errno]     - The system error number associated with the error.
 * @property {string}           message     - A string containing a human-readable description of the error.
 * @property {string}           name        - A string representing the name of the error.
 * @property {string}           [path]      - Optional path information.
 * @property {string}           [stack]     - The stack trace of the error for debugging purposes.
 * @property {string}           [syscall]   - Optional system call information.
 */
type DefaultErrorOptions =
{
    cause?:     unknown;            // Built-in; ES2022
    code?:      number | string;    // Node-specific
    errno?:     number;             // Node-specific
    message:    string;             // Built-in
    name:       string;             // Built-in
    path?:      string;             // Node-specific
    stack?:     string;             // optional, non-standard!
    syscall?:   string;             // Node-specific
}

// Export type.
export type {DefaultErrorOptions};