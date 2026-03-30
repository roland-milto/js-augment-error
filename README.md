# [`@js-augment/error`](https://www.npmjs.com/package/@js-augment/error)

![Typescript project](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![NPM version](https://img.shields.io/npm/v/@js-augment/error?color=blue)
![Browser supported](https://img.shields.io/badge/Browser-supported-brightgreen)
![ESM supported](https://img.shields.io/badge/ESM-supported-brightgreen)
![Tree shaking](https://img.shields.io/badge/Tree--shaking-supported-brightgreen)

Straightforward to use (one example):

```ts
// Import: external error functions.
import {ValueUnexpectedError} from "@js-augment/error";

try {
  switch (true) {
    case typeof value === "string":
      console.log(value);
      break;
      
    // ... do other cases.
    
    // Unexpected value.
    default:
      throw new ValueUnexpectedError();
  }
  
}
catch (e) {
  console.error(e.name);
  console.log(e.code);
  console.log(e.message);
}
```

Output:

```text
ValueUnexpectedError
400
Unexpected value error.
```

Create your own errors:

```ts
// Import: external functions and classes.
import {createCustomNamedError} from "@js-augment/error";

const MyOwnError = createCustomNamedError("MyOwnError", "My own error gone wrong!", 42, "error");

try {
  throw new MyOwnError();
}
catch (e) {
  console.error(e.name);
  console.log(e.code);
  console.log(e.message);
}
```

Output:

```text
MyOwnError
42
My own error gone wrong!
```

## Table of contents: runtime type checks and guards

<details>
  <summary><b>Click here to open the table of contents</b></summary>

- [What is @js-augment/error?](#what-is-js-augmenterror)
- [How to use @js-augment/error?](#how-to-use-type-checkguards)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [package.json](#packagejson)
  * [tsconfig.json](#tsconfigjson)
  * [Import](#import)
    - [Local imports (Node.js)](#local-imports)
    - [Global imports (Node.js)](#global-imports)
    - [Browser import & CDN (jsDelivr)](#browser-import)
- [Define your own errors](#define-your-own-errors)
- [Predefined errors](#predefined-errors)
  * [API errors](#api-errors)
  * [Auth errors](#auth-errors)
  * [Database errors](#database-errors)
  * [Directory errors](#directory-errors)
  * [File errors](#file-errors)
  * [Network errors](#network-errors)
  * [Object errors](#object-errors)
  * [Other errors](#other-errors)
  * [Path errors](#path-errors)
  * [Server errors](#server-errors)
  * [System errors](#system-errors)
  * [Token errors](#token-errors)
  * [Validation errors](#validation-errors)
  * [Value errors](#value-errors)
- [Constants](#constants)
  * [ERROR_TARGET_REASON_MAP](#ERROR_TARGET_REASON_MAP)
  * [SEVERITY](#SEVERITY)
- [Interfaces and types](#interfaces-and-types)
  * [CustomAdditionalErrorDetails](#CustomAdditionalErrorDetails)
  * [CustomBaseErrorOptions](#CustomBaseErrorOptions)
  * [DefaultErrorOptions](#DefaultErrorOptions)
  * [ErrorReason](#ErrorReason)
  * [ErrorTarget](#ErrorTarget)
  * [ErrorTargetReasonMap](#ErrorTargetReasonMap)
  * [RequiredPredefinedErrorDetails](#RequiredPredefinedErrorDetails)
  * [Severity](#Severity)
- [The **@js-augment** ecosystem](https://github.com/roland-milto/open-source#the-js-augment-ecosystem)
- [The **@type-check** ecosystem](https://github.com/roland-milto/open-source#the-type-check-ecosystem)
- [Other helpful tools](https://github.com/roland-milto/open-source#other-helpful-tools)
- [Support & Error Reporting](https://github.com/roland-milto/open-source#support-or-report-an-error)
- [Contributing](https://github.com/roland-milto/open-source#contributing)

</details>

<br>

## What is *@js-augment/error*?
[@js-augment/error](https://www.npmjs.com/package/@js-augment/error) extends the JavaScript Error object to provide more precise error messages 
and defines how additional data should be added to the error event. It also makes it easy to create custom error messages.

This lightweight library works exceptionally well with the [@js-augment/log](https://www.npmjs.com/package/@js-augment/log) module, 
which outputs errors directly to the console, appends them to log files as JSON data, or makes them available via email.

---

## How to use *@js-augment/error*?

### Prerequisites

The package is designed as a native **ES module (ESM)** and supports all modern environments from **ES2020+** (Node.js
16+, current browsers, and edge runtimes) to ensure maximum efficiency without unnecessary polyfills.

### Installation

To install `@js-augment/error`, use the following command in your terminal:

```bash
npm install @js-augment/error
```

### package.json

Ensure that `@js-augment/error` is included in your `package.json` dependencies and always use the latest version:

```json
{
 "dependencies": {
  "@js-augment/error": "*"
 }
}
```

You can leave the asterisk (*) to ensure that the latest version is installed.
However, it is recommended that you specify an exact version, as any errors in the library could directly affect your project.

### tsconfig.json

Since `@js-augment/error` is exported as an ESM module, it is necessary to
adjust the `moduleResolution` option in the `tsconfig.json` file
to avoid error messages from the TypeScript compiler:

```json
{
 "compilerOptions": {
  "moduleResolution": "NodeNext"
 }
}
```

### Import

#### Local imports

Individual import of specific errors (Tree-Shaking):

```typescript
import {ValueUnexpectedError} from "@js-augment/error";

try {
  throw new ValueUnexpectedError({
    notExpected: "to be thrown here"
  })
} 
catch (error) {
  if (error instanceof ValueUnexpectedError) {
    console.error("Error is unexpected:", error.notExpected);
  }
}
```

Output:
```plaintext
Error is unexpected: to be thrown here
```

Using a different name or alias:
```ts
import {ValueUnexpectedError as UnexpectedError} from "@js-augment/error";
```

#### Global imports

Use `@js-augment/error` as a global import for all functions and types, so you only need to include the libary *once* in your
project:

```ts
import '@js-augment/error/register-global';

throw new ValueUnexpectedError();
```

If your IDE does not automatically recognize the types, you can manually register them in `tsconfig.json`:

```json
{
 "compilerOptions": {
  "types": [
   "@js-augment/error/register-global"
  ]
 }
}
```

### Browser import

If the bundle is to be hosted locally, the minified bundle can be found at `dist/index.min.mjs` in the package
directory.

For rapid prototyping or direct browser usage (without a build step), you can load `@js-augment/error` via the Delivery
Network (CDN) *jsDelivr* or *unpkg*:

```html

<script type="module">
  import {ValueUnexpectedError} from 'https://cdn.jsdelivr.net/npm/@js-augment/error/dist/index.min.mjs';

  throw new ValueUnexpectedError();
</script>
```

> For **unpkg** use: https://unpkg.com/@js-augment/error/dist/index.min.mjs

---

## Define your own errors

You can define your own errors using the function `createCustomNamedError`.
There are five optional parameters that can be passed to the error constructor in this order:
- `errorName` - The error name.
- `message` - The error message.
- `code` - The error code.
- `severity` - The severity of the error.
- `target` - The target of the error.
- `reason` - The reason for the error.

For the third parameter you need to check the constant [`SEVERITY`](#SEVERITY) for possible values.
For the fourth and fifth parameters you need to check the constant [`ERROR_TARGET_REASON_MAP`](#ERROR_TARGET_REASON_MAP) for possible values.

**Hint:** If `code` is not a number, then the code is set to 418.

```typescript
// Import: internal functions.
import {createCustomNamedError} from "@js-augment/error";

// Using only one parameter, you can call it like this: throw new OneParamError();
const OneParamError = createCustomNamedError("OneParamError", "very custom");

// Using two parameters, you can call it like this: throw new TwoParamError();
const TwoParamError = createCustomNamedError("TwoParamError", "very custom", 404);

// Using three parameters, you can call it like this: throw new ThreeParamError();
const ThreeParamError = createCustomNamedError("ThreeParamError", "very custom", 404, "fatal");

// Using four parameters, you can call it like this: throw new FourParamError();
const FourParamError = createCustomNamedError("FourParamError", "very custom", 404, "fatal", "database");

// Using five parameters, you can call it like this: throw new FiveParamError();
const FiveParamError = createCustomNamedError("FiveParamError", "very custom", 404, "fatal", "database", "connection");
```

### Additional details (Full example)

```typescript
// Import: external functions.
import {getDataType, isString} from "@type-check/guards";

// Import: internal functions.
import {createCustomNamedError} from "@js-augment/error";

// Create a custom error class.
const MyCustomError = createCustomNamedError("MyCustomError", "very custom", 404, "error", "unknown", "unknown");

// Function to check names.
function myFunction(myName) {
  if (!isString(myName)) {
    throw new MyCustomError({
      argument: "myName",

      // You can overwrite the initial code "404" you gave if you need to.
      code: 400,

      // Add custom data or metadata to the error (must be a plain object).
      custom: {
        plainObject: true,
        city: "Langenhagen",
      },

      // Can be any type of data.
      expected: "string",

      // Must be a string.
      functionName: "myFunction",

      // Must be a string.
      hostname: "srv1.example.com",

      // You can overwrite the initial message "very custom" if you need to.
      message: "very very custom",

      // Use of external libary functions to get the given data type.
      notExpected: getDataType(myName),

      // You can overwrite the initial reason "unknown" if you need to.
      reason: "value",

      // You can overwrite the initial severity "error" if you need to.
      severity: "critical",

      // You can overwrite the initial target "unknown" if you need to.
      target: "value"
    });
  }
}

// Instantiate the error with additional options.
try {
  myFunction(123);
}
// Accessing error properties.
catch (error) {
  // "MyCustomError"
  console.error(error.name);
  // Because 'value' is 'empty'
  console.log("Because '"+ error.target +"' is '" + error.reason +"'");
  // 400
  console.log(error.code);
  // "error"
  console.log(error.severity);
  // "srv1.example.com"
  console.log(error.hostname);
  // Message from your language file.
  console.log(error.message);
  // Expected type: string but got: integer
  console.log("Expected type: " + error.expected + " but got: " + error.notExpected);
  /*
  ┌─────────────┬───────────────┐
  │ (index)     │ Values        │
  ├─────────────┼───────────────┤
  │ plainObject │ true          │
  │ city        │ 'Langenhagen' │
  └─────────────┴───────────────┘
   */
  console.table(error.custom);
  // e.g., Iso Date: 2026-03-30T19:48:16.104Z
  console.log("Iso Date: " + error.timestamp);
  // Is builtin error: false
  console.log("Is builtin error: " + error.isBuiltin);
}
```

---

## Predefined errors

### API errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| api        | ApiInvalidRequestError             | Thrown when an API request is malformed or contains invalid parameters.                                            |
| api        | ApiMethodNotAllowedError           | Thrown when the API endpoint does not support the requested HTTP method.                                           |
| api        | ApiNotFoundError                   | Thrown when the requested API endpoint or resource does not exist.                                                 |
| api        | ApiRateLimitError                  | Thrown when the API request rate limit has been exceeded.                                                          |
| api        | ApiVersionError                    | Thrown when the requested API version is invalid or unsupported.                                                   |

### Auth errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| auth       | AuthForbiddenError                 | Thrown when access to a resource is explicitly forbidden.                                                          |
| auth       | AuthPermissionError                | Thrown when the authenticated user lacks the required permissions.                                                 |
| auth       | AuthSessionExpiredError            | Thrown when an authentication session has expired and re-authentication is required.                               |
| auth       | AuthUnauthorizedError              | Thrown when authentication is required but missing or invalid.                                                     |

### Database errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| database   | DatabaseConnectionError            | Thrown when a connection to the database cannot be established.                                                    |
| database   | DatabaseDisconnectionError         | Thrown when an existing database connection is unexpectedly lost.                                                  |
| database   | DatabaseQueryError                 | Thrown when a database query fails during execution.                                                               |
| database   | DatabaseTimeoutError               | Thrown when a database operation exceeds the allowed time limit.                                                   |

# Directory errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| directory  | DirectoryAlreadyExistsError        | Thrown when attempting to create a directory that already exists.                                                  |
| directory  | DirectoryCreationError             | Thrown when a directory cannot be created due to an operation failure.                                             |
| directory  | DirectoryDeletionError             | Thrown when deleting a directory fails during the operation.                                                       |
| directory  | DirectoryEmptyError                | Thrown when a directory is unexpectedly empty.                                                                     |
| directory  | DirectoryExpectedError             | Thrown when a directory was expected but not provided or found.                                                    |
| directory  | DirectoryNotEmptyError             | Thrown when a directory is expected to be empty but contains files or subdirectories.                              |
| directory  | DirectoryNotFoundError             | Thrown when a requested directory cannot be found.                                                                 |
| directory  | DirectoryPathFormatError           | Thrown when a directory path does not match the expected format.                                                   |
| directory  | DirectoryPermissionError           | Thrown when the current process lacks permission to access or modify a directory.                                  |

# File errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| file       | FileAlreadyExistsError             | Thrown when attempting to create a file that already exists.                                                       |
| file       | FileCreationError                  | Thrown when a file cannot be created due to an operation failure.                                                  |
| file       | FileCopyError                      | Thrown when copying a file fails during the operation.                                                             |
| file       | FileDeletionError                  | Thrown when deleting a file fails during the operation.                                                            |
| file       | FileEmptyError                     | Thrown when a file is unexpectedly empty.                                                                          |
| file       | FileExpectedError                  | Thrown when a file was expected but not provided or found.                                                         |
| file       | FileExtensionError                 | Thrown when a file has an invalid or unsupported extension or format.                                              |
| file       | FileNotFoundError                  | Thrown when a requested file cannot be found.                                                                      |
| file       | FilePathFormatError                | Thrown when a file path does not match the expected format.                                                        |
| file       | FilePermissionError                | Thrown when the current process lacks permission to access or modify a file.                                       |
| file       | FileUnreadableError                | Thrown when a file cannot be read during an operation.                                                             |
| file       | FileUnwritableError                | Thrown when a file cannot be written during an operation.                                                          |
| file       | FileSystemLimitError               | Thrown when a file operation fails due to system-level limitations such as disk quotas or file system constraints. |
| link       | LinkNotFoundError                  | Thrown when a requested link or symbolic link cannot be found.                                                     |
| link       | SymlinkLoopError                   | Thrown when a symbolic link loop is detected during path resolution.                                               |

### Network errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| network    | NetworkAddressInUseError           | Thrown when a network address is already in use by another process.                                                |
| network    | NetworkConnectionError             | Thrown when a network connection cannot be established or fails unexpectedly.                                      |
| network    | NetworkHostUnreachableError        | Thrown when the target host cannot be reached over the network.                                                    |
| network    | NetworkPortInUseError              | Thrown when a network port is already in use by another process.                                                   |

### Object errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| object     | ObjectPropertyMissingError         | Thrown when an expected property is missing from an object.                                                        |

### Other errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| other      | AssertionError                     | Thrown when an assertion in the code fails.                                                                        |
| other      | UnknownError                       | Thrown when an unknown or unexpected error occurs.                                                                 |

### Path errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| path       | PathTooLongError                   | Thrown when a file system path exceeds the maximum allowed length.                                                 |

### Server errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| server     | ServerConnectionError              | Thrown when the server fails to establish or maintain a required connection.                                       |
| server     | ServerInputOutputError             | Thrown when a server-side input/output operation fails.                                                            |
| server     | ServerInternalError                | Thrown when an unexpected internal server error occurs.                                                            |
| server     | ServerTimeoutError                 | Thrown when a server operation exceeds the allowed time limit.                                                     |

### System errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| system     | SystemCriticalCpuUsageError        | Thrown when CPU usage reaches a critical level that may affect system stability.                                   |
| system     | SystemOutOfMemoryError             | Thrown when the system runs out of available memory.                                                               |
| system     | SystemOutOfDiskSpaceError          | Thrown when the system runs out of disk space.                                                                     |
| system     | SystemReadOnlyError                | Thrown when the system is in read-only mode and write operations are not allowed.                                  |
| system     | SystemTooManyFilesOpenError        | Thrown when the system exceeds the limit for simultaneously open files.                                            |

### Token errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| token      | TokenExpiredError                  | Thrown when an authentication token has expired and is no longer valid.                                            |
| token      | TokenInvalidError                  | Thrown when an authentication token is invalid or malformed.                                                       |
| token      | TokenMissingError                  | Thrown when an expected authentication token is missing from the request.                                          |

### Validation errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| validation | ValidationMissingFieldError        | Thrown when a required field is missing during validation.                                                         |
| validation | ValidationInvalidFormatError       | Thrown when a value does not match the expected format during validation.                                          |
| validation | ValidationConstraintViolationError | Thrown when a value violates a validation constraint (e.g., range, pattern, or rule).                              |

### Value errors
| Target     | Error                              | Description                                                                                                        |
|------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| value      | ValueContainsWhitespaceError       | Thrown when a value contains unexpected whitespace.                                                                |
| value      | ValueDataTypeError                 | Thrown when a value is of the wrong data type.                                                                     |
| value      | ValueEmptyOrZeroError              | Thrown when a value is empty or zero, but a valid value is required.                                               |
| value      | ValueFormatError                   | Thrown when a value does not match the expected format.                                                            |
| value      | ValueOutOfRangeError               | Thrown when a value is outside the allowed range.                                                                  |
| value      | ValueUnexpectedError               | Used to represent unexpected errors related to invalid or improperly formatted values.                             |

---

## Constants

### ERROR_TARGET_REASON_MAP
In this object constant, the affected area (target) is specified as the property name, and the reasons why the error was thrown are specified as an array of properties.
In particular, this constant can be used for filter functions, since the errors exported by this module always include a target and a reason.

```typescript
// Import: types.
import type {ErrorTargetReasonMap} from "@js-augment/error";

// Import: external constants.
import {ERROR_TARGET_REASON_MAP} from "@js-augment/error";

// Print all targets and possible reasons.
const map: ErrorTargetReasonMap = ERROR_TARGET_REASON_MAP;

for (const [target, reasons] of Object.entries(map)) 
{
  console.log(`${target}:`);
  
  for (const reason of reasons) {
    console.log(`  - ${reason}`);
  }
}
```

Output:
```plaintext
api:
  - limit
  - notFound
  - request
auth:
  - forbidden
  - permission
  - unauthorized
database:

(... and more)
```

Show all possible targets:
```typescript
console.log(Object.keys(ERROR_TARGET_REASON_MAP));
```

Output:
```plaintext
[
  'api',      'auth',
  'database', 'directory',
  'file',     'link',
  'network',  'object',
  'other',    'path',
  'server',   'system',
  'token',    'validation',
  'value',    'unknown'
]
```

Show all reasons for the "api" target:
```typescript
console.log(ERROR_TARGET_REASON_MAP["api"]);
```

Output:
```plaintext
['limit', 'notFound', 'request']
```

### SEVERITY
This array constant provides difficulty levels as strings, which makes filtering easier.

```typescript
// Import: external constants.
import {SEVERITY} from "@js-augment/error";

console.log(SEVERITY);
```

Output:
```plaintext
[
  'critical', 'debug',
  'error',    'fatal',
  'info',     'success',
  'warning'
]
```

---

## Interfaces and types

### CustomAdditionalErrorDetails
A type that represents additional error details that can be added to the error object.
It is always used with the [`RequiredPredefinedErrorDetails`](#RequiredPredefinedErrorDetails) and [`DefaultErrorOptions`](#DefaultErrorOptions) type.

Possible properties are 
*argument*, *custom*, *expected*, *functionName*, *hostname*, *message*, *notExpected*, *reason*, *severity*, and *target*.

### CustomBaseErrorOptions
Combines all the options that can be used to create a custom error like:
- [`DefaultErrorOptions`](#DefaultErrorOptions)
- [`RequiredPredefinedErrorDetails`](#RequiredPredefinedErrorDetails)
- [`CustomAdditionalErrorDetails`](#CustomAdditionalErrorDetails)

Required properties are:
 *code*, *isBuiltin*, *message*, *name*, *reason*, *severity*, and *target*.

### DefaultErrorOptions
Options that are set by the environment, like the browser or Node.js backend.

These properties are implemented in the error object by default:
*name*, *message* and *cause* (optional).

Optional, non-standard properties are:
*code*, *errno*, *path*, *stack* and *syscall*.

### ErrorReason
A type that represents a reason for an error, derived from a specific error target
defined in the [`ERROR_TARGET_REASON_MAP`](#ERROR_TARGET_REASON_MAP). It is linked to a target and its associated reasons.

e.g., "limit" | "notFound" | "request" | "forbidden" | "permission" | ...

```typescript
// Import: interfaceses and types.
import type {ErrorReason} from "@js-augment/error";

// Assuming "connection" is a valid reason for a target.
const reason: ErrorReason = "connection";
```

### ErrorTarget
Represents the keys of the `ERROR_TARGET_REASON_MAP` object.
This type ensures that only valid keys from the map can be used.

```typescript
// Import: interfaceses and types.
import type {ErrorTarget} from "@js-augment/error";

// Assuming that:
ERROR_TARGET_REASON_MAP = {
  user: "invalid"
}

let target: ErrorTarget;

// Valid key
target = "user";

// TypeScript error: Type '"unknown"' is not assignable to type 'ErrorTarget'.
target = "unknown";
```

### ErrorTargetReasonMap
Checks against the [`ERROR_TARGET_REASON_MAP`](#ERROR_TARGET_REASON_MAP) constant to ensure only valid values are used.

```typescript
// Import: interfaceses and types.
import type {ErrorTargetReasonMap} from "@js-augment/error";

// This is valid, since the "api" target is defined in the ERROR_TARGET_REASON_MAP constant with the possible reason "notFound".
const apiError: ErrorTargetReasonMap['api'] = "notFound";
```

### RequiredPredefinedErrorDetails
These properties are always required when creating a custom error:
*code*, *isBuiltin*, *reason*, *severity*, and *target*.

### Severity
Checks against the severity array constant [`SEVERITY`](#SEVERITY) to ensure only valid values are used.

```typescript
// Import: interfaceses and types.
import type {Severity} from "@js-augment/error";

// A critical system failure.
const severity: Severity = "critical";

// Debug output for development.
const otherSeverity: Severity = "debug";
```