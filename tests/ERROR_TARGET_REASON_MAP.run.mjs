// Import: internal constants.
import {ERROR_TARGET_REASON_MAP} from "../dist/data/constants/ERROR_TARGET_REASON_MAP.mjs";

// Print all targets and possible reasons.
const map = ERROR_TARGET_REASON_MAP;

/**
 * api:
 *   - limit
 *   - notFound
 *   - request
 * auth:
 *   - forbidden
 *   - permission
 *   - unauthorized
 * database:
 *   - connection
 *   - query
 *   - timeout
 * directory:
 *   - content
 *   - exists
 *   - expected
 *   - format
 *   - notFound
 *   - operation
 *   - permission
 * file:
 *   - content
 *   - exists
 *   - expected
 *   - format
 *   - notFound
 *   - operation
 *   - permission
 *   - system
 * link:
 *   - notFound
 *   - loop
 * network:
 *   - connection
 *   - host
 *   - used
 * object:
 *   - property
 * other:
 *   - assertion
 *   - name
 *   - unknown
 * path:
 *   - length
 * server:
 *   - connection
 *   - inputOutput
 *   - internal
 *   - timeout
 * system:
 *   - connection
 *   - hardware
 *   - permission
 * token:
 *   - expired
 *   - invalid
 *   - missing
 * validation:
 *   - format
 *   - missing
 * value:
 *   - empty
 *   - format
 *   - range
 *   - type
 * unknown:
 *   - unknown
 */
for (const [target, reasons] of Object.entries(map))
{
	console.log(`${target}:`);

	for (const reason of reasons) {
		console.log(`  - ${reason}`);
	}
}

/**
 * [
 *   'api', 'auth',
 *   'database', 'directory',
 *   'file', 'link',
 *   'network', 'object',
 *   'other', 'path',
 *   'server', 'system',
 *   'token', 'validation',
 *   'value', 'unknown'
 * ]
 */
console.log(Object.keys(ERROR_TARGET_REASON_MAP));

/**
 * [ 'limit', 'notFound', 'request' ]
 */
console.log(ERROR_TARGET_REASON_MAP["api"]);