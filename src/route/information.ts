/**
 * Date: 6/9/20
 * Time: 10:35 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import * as path from "path";
import {CommandHttpRouteHandler} from "./base";

/**
 * Returns information pulled out of the applications package.
 */
export abstract class CommandHttpRouteInformation extends CommandHttpRouteHandler {
	protected async _execute(): Promise<void> {
		const pkg = this.findApplicationPackage();
		this.res.json(_.pick(pkg, [
			"author",
			"description",
			"homepage",
			"name",
			"version"
		]));
	}

	/**
	 * Looks for the applications package and if it can't find it the returns the modules `package.json`
	 */
	private findApplicationPackage(): object {
		if(require.main?.filename) {
			return require(path.join(path.parse(require.main?.filename).base, "package.json"));
		} else {
			return require("../../package.json");
		}
	}
}
