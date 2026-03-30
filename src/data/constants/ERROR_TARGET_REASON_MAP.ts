/**
 * A constant map linking error targets (e.g., `api`, `auth`, `database`) to their corresponding error reason keys,
 * which are further associated with specific error classes. This structure facilitates error handling and categorization.
 *
 * @author  Roland Milto (https://roland.milto.de/)
 * @version 2026-03-10
 *
 * @example
 * // Accessing specific error reasons:
 * const apiErrorReasons = ERROR_TARGET_REASON_MAP.api;
 * // ["limit", "notFound", "request"]
 *
 * const databaseErrorReasons = ERROR_TARGET_REASON_MAP.database;
 * // ["connection", "query", "timeout"]
 *
 * const authErrorReasons = ERROR_TARGET_REASON_MAP.auth;
 * // ["forbidden", "permission", "unauthorized"]
 */
const ERROR_TARGET_REASON_MAP =
{
  api: [
    "limit",        // ApiRateLimitError
    "notFound",     // ApiNotFoundError
    "request",      // ApiInvalidRequestError, ApiVersionError, ApiMethodNotAllowedError
  ],
  auth: [
    "forbidden",    // AuthForbiddenError
    "permission",   // AuthPermissionError
    "unauthorized", // AuthSessionExpiredError, AuthUnauthorizedError
  ],
  database: [
    "connection",   // DatabaseConnectionError, DatabaseDisconnectionError
    "query",        // DatabaseQueryError
    "timeout",      // DatabaseTimeoutError
  ],
  directory: [
    "content",      // DirectoryEmptyError, DirectoryNotEmptyError
    "exists",       // DirectoryAlreadyExistsError
    "expected",     // DirectoryExpectedError
    "format",       // DirectoryPathFormatError
    "notFound",     // DirectoryNotFoundError
    "operation",    // DirectoryCreationError, DirectoryDeletionError
    "permission",   // DirectoryPermissionError
  ],
  file: [
    "content",      // FileEmptyError
    "exists",       // FileAlreadyExistsError
    "expected",     // FileExpectedError
    "format",       // FileExtensionError, FilePathFormatError
    "notFound",     // FileNotFoundError
    "operation",    // FileCreationError, FileCopyError, FileDeletionError, FileUnreadableError, FileUnwritableError
    "permission",   // FilePermissionError
    "system",       // FileSystemLimitError
  ],
  link: [
    "notFound",     // LinkNotFoundError
    "loop",         // SymlinkLoopError
  ],
  network: [
    "connection",   // NetworkConnectionError
    "host",         // NetworkHostUnreachableError
    "used",         // NetworkAddressInUseError, NetworkPortInUseError
  ],
  object: [
    "property",     // ObjectPropertyMissingError
  ],
  other: [
    "assertion",    // AssertionError
    "name",         // ErrorClassNameError
    "unknown",      // UnknownError
  ],
  path: [
    "length",       // PathTooLongError
  ],
  server: [
    "connection",   // ServerConnectionError
    "inputOutput",  // ServerInputOutputError
    "internal",     // ServerInternalError
    "timeout",      // ServerTimeoutError
  ],
  system: [
    "connection",   // SystemTooManyFilesOpenError
    "hardware",     // SystemCriticalCpuUsageError, SystemOutOfDiskSpaceError, SystemOutOfMemoryError
    "permission",   // SystemReadOnlyError
  ],
  token: [
    "expired",      // TokenExpiredError
    "invalid",      // TokenInvalidError
    "missing",      // TokenMissingError
  ],
  validation: [
    "format",       // ValidationInvalidFormatError, ValidationConstraintViolationError
    "missing",      // ValidationMissingFieldError
  ],
  value: [
    "empty",        // ValueEmptyOrZeroError
    "format",       // ValueContainsWhitespaceError, ValueFormatError
    "range",        // ValueOutOfRangeError
    "type",         // ValueDataTypeError
  ],

  // Especially for custom-named errors that are not predefined by the library.
  unknown: [
    "unknown",
  ]
} as const;

// Export constant.
export {ERROR_TARGET_REASON_MAP};