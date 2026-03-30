// Import: external functions.
import {getTypeOf, isString} from "@type-check/guards";

// Import: internal functions.
import {createCustomNamedError} from "../dist/functions/createCustomNamedError.mjs";

// Create a custom error class.
const MyCustomError = createCustomNamedError("MyCustomError", "very custom", 404, "error", "unknown", "unknown");

// Function to check names.
function myFunction(myName)
{
  if (!isString(myName))
  {
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

      // Use of external library functions to get the given data type.
      notExpected: getTypeOf(myName),

      // You can overwrite the initial reason "unknown" if you need to.
      reason: "empty",

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
  │ plainObject │ true         │
  │ city        │ 'Langenhagen' │
  └─────────────┴───────────────┘
   */
  console.table(error.custom);
  // e.g., Iso Date: 2026-03-30T19:48:16.104Z
  console.log("Iso Date: " + error.timestamp);
  // Is builtin error: false
  console.log("Is builtin error: " + error.isBuiltin);
}