/**
 * Date: 6/9/20
 * Time: 10:35 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {getModulesApplicationPackage} from "pig-dam-core";
import {CommandHttpRouteHandler} from "./base";

/**
 * Loads package and pulls out some good stuff and sends it back to the client
 */
export class CommandHttpRouteInformation extends CommandHttpRouteHandler {
	protected async _execute(): Promise<void> {
		const pkg = getModulesApplicationPackage();
		this.res.json(_.pick(pkg, [
			"author",
			"description",
			"homepage",
			"name",
			"version"
		]));
	}
}
