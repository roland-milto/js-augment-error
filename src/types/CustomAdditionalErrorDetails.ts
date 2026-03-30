// Import: interfaces and types.
import type {Severity} from "./Severity.js";
import type {PlainObject} from "@type-check/guards";

/**
 * @interface CustomAdditionalErrorDetails
 *
 * Represents an error object used for tracking and handling application errors.
 *
 * @author  Roland Milto
 * @version 2026-02-14
 *
 * @property {string}       [argument]      - The argument or parameter that caused the error.
 * @property {number}       [code]          - The numerical code representing the error type or status.
 * @property {PlainObject}  [custom]        - A custom object containing additional information about the error.
 * @property {any}          [expected]      - The expected value or result of the operation.
 * @property {string}       [functionName]  - The name of the function or method that caused the error.
 * @property {string}       [hostname]      - The hostname of the server where the error occurred.
 * @property {string}       [message]       - A string containing a human-readable description of the error.
 * @property {any}          [notExpected]   - The unexpected or invalid value or result of the operation.
 * @property {string}       [reason]        - The reason or context for the error and can only be set for custom-named errors.
 * @property {Severity}     [severity]      - The severity level of the error.
 * @property {string}       [target]        - The target or context of the error and can only be set for custom-named errors.
 */
interface CustomAdditionalErrorDetails
{
  argument?:      string;
  code?:          number;
  custom?:        PlainObject;
  expected?:      any;
  functionName?:  string;
  hostname?:      string;
  message?:       string;
  notExpected?:   any;
  reason?:        string;     // Only allowed for custom-named errors.
  severity?:      Severity;
  target?:        string;     // Only allowed for custom-named errors.
}

// Export interface.
export type {CustomAdditionalErrorDetails};