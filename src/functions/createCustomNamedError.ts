// Import: interfaces and types.
import type {Severity} from "../types/Severity.js";
import type {ErrorTarget} from "../types/ErrorTarget.js";
import type {ErrorReason} from "../types/ErrorReason.js";
import type {RequiredPredefinedErrorDetails} from "../types/RequiredPredefinedErrorDetails.js";
import type {CustomAdditionalErrorDetails} from "../types/CustomAdditionalErrorDetails.js";

// Import: classes.
import {CustomBaseError} from "../classes/CustomBaseError.class.js";

/**
 * Creates a custom error class with a specific code and severity. The generated error class extends `CustomBaseError`
 * and ensures that the name ends with "Error".
 *
 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-30
 *
 * @template T                                          - The type of the target associated with the error.
 *
 * @param   {string}                [className="Error"]  - The name of the generated error class.
 * @param   {string}                [message=""]         - The error message to be displayed.
 * @param   {number}                [code=418]           - The error code to associate with the custom error.
 * @param   {Severity}              [severity="error"]   - The severity level of the error.
 * @param   {T extends ErrorTarget} [target="unknown"]   - The target associated with this error (e.g., component, service, etc.).
 * @param   {ErrorReason}           [reason="unknown"]   - The reason or context for the error associated with the given target.
 *
 * @returns {typeof CustomBaseError}                     - A custom error class that has the given properties.
 *
 * @example
 * // Create a custom error class.
 * const MyCustomError = createCustomNamedError("MyCustomError", "very custom", 404, "error", "unknown", "unknown");
 *
 * // Instantiate the error with additional options.
 * try {
 *  throw new MyCustomError({
 *    hostname: "srv1.example.com"
 *  });
 * }
 * // Accessing error properties.
 * catch (error)
 * {
 *  // "MyCustomError"
 *  console.error(error.name);
 *
 *  // 404
 *  console.error(error.code);
 *
 *   // "error"
 *  console.error(error.severity);
 *
 *  // "srv1.example.com"
 *  console.error(error.hostname);
 *
 *  // Message from your language file.
 *  console.error(error.message);
 * }
 */
function createCustomNamedError<T extends ErrorTarget>(
  className: string = "Error",
  message: string = "",
  code: number = 417,
  severity: Severity = "error",
  target?: T,
  reason?: ErrorReason<T>
): typeof CustomBaseError
{
  const GeneratedError = class extends CustomBaseError
  {
    // Pipe the options, but do not allow to set the name.
    constructor(options?: CustomAdditionalErrorDetails)
    {
      // Merge options with the code, target and reason.
      const merged: RequiredPredefinedErrorDetails & CustomAdditionalErrorDetails =
        {
          code,
          message,
          reason: (reason ?? "unknown") as ErrorReason<T>,
          severity,
          target: (target ?? "unknown") as T,
          ...options,

          // Indicate this as a custom error.
          isBuiltin: false
        };

      super(merged);
    }
  };

  Object.defineProperty(GeneratedError, "name", {
    value: className,
    configurable: true
  });

  return GeneratedError;
}

// Export function.
export {createCustomNamedError};