// Import: interfaces and types.
import type {ErrorTarget} from "./ErrorTarget.js";

// Import: internal constants.
import {ERROR_TARGET_REASON_MAP} from "../data/constants/ERROR_TARGET_REASON_MAP.js";

/**
 * The `ErrorTargetReasonMap` type defines a structured mapping between high-level error categories (e.g., `api`, `auth`, `database`)
 * and their corresponding specific error reasons (e.g., `limit`, `notFound`, `connection`). Each reason provides insight into
 * the exact nature of an error within the respective category, aiding in debugging and error handling.

 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-10

 * @example
 * // Accessing a reason under a category
 * const apiError: ErrorTargetReasonMap['api'] = "notFound"; // e.g., for ApiNotFoundError
 *
 * const fileError: ErrorTargetReasonMap['file'] = "permission"; // e.g., for FilePermissionError
 *
 * const systemError: ErrorTargetReasonMap['system'] = "hardware"; // e.g., for SystemCriticalCpuUsageError, SystemOutOfDiskSpaceError
 */
type ErrorTargetReasonMap = {
  [K in ErrorTarget]: (typeof ERROR_TARGET_REASON_MAP)[K][number];
};

// Export type.
export type {ErrorTargetReasonMap};