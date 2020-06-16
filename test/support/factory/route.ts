/**
 * Date: 6/8/20
 * Time: 9:59 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRouteHandler} from "../../../src/route";

/**
 * An instantiable test command
 */
export class CommandHttpRouteTest extends CommandHttpRouteHandler {
	protected async _execute(): Promise<void> {
	}
}

