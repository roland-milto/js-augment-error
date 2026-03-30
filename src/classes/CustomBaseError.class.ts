//#region External imports
  // External interfaces and types.
  import {PlainObject} from "@type-check/guards";

  // Functions.
  import {isNumber} from "@js-augment/number";
  import {isPlainObject, isString} from "@type-check/guards";
//#endregion

//#region Internal imports
  // Interfaces and types.
  import type {Severity} from "../types/Severity.js";
  import type {CustomBaseErrorOptions} from "../types/CustomBaseErrorOptions.js";
  import type {CustomAdditionalErrorDetails} from "../types/CustomAdditionalErrorDetails.js";
  import type {ErrorTarget} from "../types/ErrorTarget.js";

  // Constants.
  import {ERROR_TARGET_REASON_MAP} from "../data/constants/ERROR_TARGET_REASON_MAP.js";
import type {RequiredPredefinedErrorDetails} from "../types/RequiredPredefinedErrorDetails.js";
//#endregion

/**
 * The `CustomBaseError` class is an enhanced error class that extends the built-in `Error` object.
 * It provides additional properties for detailed error context, such as severity, error code, target, and reason,
 * along with optional details like argument, hostname, and expected values.

 * This class is typically used for creating domain-specific or application-level errors with rich metadata.

 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-30
 *
 * @param   {RequiredPredefinedErrorDetails & CustomAdditionalErrorDetails} options -
 *    The option object that contains detailed error properties.
 *    - `code`: {number} - Numeric error code (defaults to 418 if not provided).
 *    - `message`: {string} - Error message.
 *    - `isBuiltin`: {boolean} - Indicates if the error is a built-in type.
 *    - `reason`: {string} - The reason for the error.
 *    - `severity`: {Severity} - Severity level of the error.
 *    - `target`: {string} - The error's target category (e.g., "Database", "Network").
 *    - `custom`: {PlainObject=} - Additional custom data about the error.
 *    - `expected`: {any=} - Expected value for the operation.
 *    - `notExpected`: {any=} - Rejectable or conflicting input.
 *    - `argument`: {string=} - Input argument related to the error.
 *    - `hostname`: {string=} - Server hostname where the error occurred.
 *    - `functionName`: {string=} - Name of the function that triggered the error.
 *    - `cause`: {unknown=} - The original error or cause (ES2022 feature).
 *
 * @returns {CustomBaseError} - A new instance of the `CustomBaseError` class containing all provided metadata.
 *
 * @throws  {TypeError} - If the error name does not end with "Error" or has less than 6 characters.
 * @throws  {TypeError} - If an invalid `target` string is supplied.
 * @throws  {TypeError} - If an invalid `reason` string is supplied for the specified target.
 */
class CustomBaseError extends Error implements CustomBaseErrorOptions
{
  // Builtin by "Error"-Class.
  declare cause?:   unknown;
  declare message:  string;
  declare name:     string;

  // Mostly used by the environment (Browser or Node.js).
  declare errno?:   number;
  declare path?:    string;
  declare stack?:   string;
  declare syscall?: string;

  // Set by the class itself.
  readonly timestamp: string;

  // Required error details.
  code:           number;
  isBuiltin:      boolean;
  reason:         string;
  severity:       Severity;
  target:         string;

  // Optional error details.
  argument?:      string;
  custom?:        PlainObject;
  expected?:      any;
  functionName?:  string;
  hostname?:      string;
  notExpected?:   any;

  // Constructor only accepts an object with optional properties.
  constructor(options: RequiredPredefinedErrorDetails & CustomAdditionalErrorDetails)
  {
    // Error identifier or custom message.
    super(options.message ?? "An error occurred.");

    // Cache the error name.
    const errorName: string = this.constructor?.name;

    // All error names must end with "Error".
    if (!_isValidErrorName(errorName)) {
      throw new TypeError(`Invalid error name: ${errorName}. String not ending with 'Error' or has not minimum length 6.`);
    }

    // Argument that caused the error.
    if (options.argument && isString(options.argument)) {
      this.argument = options.argument;
    }

    // Cause (ES2022).
    if ("cause" in options) {
      this.cause = options.cause;
    }

    // Numeric error code. Defaults to 418 if no code is provided.
    this.code = isNumber(options.code)
      ? options.code
      : 418;

    // Add custom properties e.g., like data "street", "age" ...
    if (options.custom && isPlainObject(options.custom)) {
      this.custom = options.custom;
    }

    // Variable or value expected.
    if ("expected" in options) {
      this.expected = options.expected;
    }

    // Name of the calling function.
    if (options.functionName && isString(options.functionName)) {
      this.functionName = options.functionName;
    }

    // Hostname of the server.
    if (options.hostname && isString(options.hostname)) {
      this.hostname = options.hostname;
    }
    else if (typeof window !== "undefined" && window.location?.hostname) {
      this.hostname = window.location.hostname;
    }

    // "options.isBuiltin" is set by the "createCustomNamedError" or "createInternalError" function.
    this.isBuiltin = options.isBuiltin;

    // Set: error name (identifier).
    this.name = errorName;

    // Variable or value not expected.
    if ("notExpected" in options) {
      this.notExpected = options.notExpected;
    }

    // Is always set: Error severity level.
    if (options.severity && isString(options.severity)) {
      this.severity = options.severity;
    }

    // "options.target" is set by the "createCustomNamedError" or "createInternalError" function.
    if ("target" in options)
    {
      let targets: Set<string> = new Set(Object.keys(ERROR_TARGET_REASON_MAP));

      if (!targets.has(options.target)) {
        throw new TypeError(`Invalid target: ${options.target}. Target must be a string.`);
      }

      this.target = options.target as string;

      // Reason can only be set if the target is valid.
      // "options.reason" is set by the "createCustomNamedError" or "createInternalError" function.
      if ("reason" in options)
      {
        const allowedReasons = ERROR_TARGET_REASON_MAP[options.target as ErrorTarget] as readonly string[];

        if (!allowedReasons.includes(options.reason as string)) {
          throw new TypeError(`Invalid reason: ${options.reason}. Reason must be a string.`);
        }

        this.reason = options.reason as string;
      }
    }

    // Current date and time.
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Validates whether a given value is a string starting with an upper case letter and ending with the suffix `Error`.
 * The function ensures the format matches the typical naming convention for errors in JavaScript.

 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-25

 * @param   {unknown} name  - The value to check for validity as an error name.
 *
 * @returns {boolean}       - `true` if the input is a string ending with `Error`; otherwise, `false`.
 *
 * @example
 * // true
 * _isValidErrorName("TypeError");
 *
 * // true
 * _isValidErrorName("SyntaxError");
 *
 * // false (does not end with "Error")
 * _isValidErrorName("Type");
 *
 * // false (not a string)
 * _isValidErrorName(123);
 */
function _isValidErrorName(name: unknown): name is `${string}Error` {
  return isString(name) && name.length > 5 && name[0] === name[0]?.toUpperCase() && name.endsWith("Error");
}

// Export class.
export {CustomBaseError};