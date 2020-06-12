/**
 * Date: 6/11/20
 * Time: 10:09 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {CommandHttpRouteInformation} from "../../../src/route";
import {
	createTestLogger,
	createTestRequest,
	createTestResponse
} from "../../support/factory";

describe("route.information", function() {
	describe("CommandHttpRouteInformation", function() {
		it("should load the application's package and write part of it to res.json", async function() {
			const res = createTestResponse();
			const command = new CommandHttpRouteInformation({
				logger: createTestLogger(),
				req: createTestRequest(),
				res
			});
			command.execute()
				.then(() => {
					const expected = _.pick(require("../../../package.json"), [
						"author",
						"description",
						"homepage",
						"name",
						"version"
					]);
					expect(res.json).toBeCalledWith(expected);
				});
		});
	});
});
