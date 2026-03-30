// Import: external functions and classes.
import {ValueUnexpectedError} from "../dist/index.mjs";

try {
	throw new ValueUnexpectedError({
		expected: "number",
		severity: "error",
		code: 400,
		message: "The value is not a number."
	});
}
catch (e) {
	console.error(e.name);
	console.log(e.expected);
	console.log(e.severity);
	console.log(e.code);
	console.log(e.message);
}