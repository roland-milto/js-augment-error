// Import: interfaces and types.
import type {DefaultErrorOptions} from "./DefaultErrorOptions.js";
import type {CustomAdditionalErrorDetails} from "./CustomAdditionalErrorDetails.js";
import type {RequiredPredefinedErrorDetails} from "./RequiredPredefinedErrorDetails.js";

/**
 * Represents error options that will be set by the `CustomBaseError` class.
 *
 * @author  Roland Milto
 * @version 2026-03-26
 *
 * @property {string}   timestamp     - The date and time when the error occurred.
 */
interface CustomBaseErrorOptions extends  Omit<DefaultErrorOptions, 'code'>,
                                          RequiredPredefinedErrorDetails,
                                          Omit<CustomAdditionalErrorDetails, 'code' | 'message' | 'reason' | 'severity' | 'target'>
{
  timestamp: string;
}

// Export interface.
export type {CustomBaseErrorOptions};