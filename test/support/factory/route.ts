/**
 * Date: 6/8/20
 * Time: 9:59 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRouteHandler} from "../../../src/route";
import {createTestLogger} from "./logger";
import {createTestRequest} from "./request";
import {createTestResponse} from "./response";

/**
 * An instantiable test command
 */
export class CommandHttpRouteTest extends CommandHttpRouteHandler {
	protected async _execute(): Promise<void> {
	}
}

export function createTestRouteHandlerCommand(): CommandHttpRouteTest {
	return new CommandHttpRouteTest({
		logger: createTestLogger(),
		path: "path/:param",
		req: createTestRequest(),
		res: createTestResponse()
	});
}
