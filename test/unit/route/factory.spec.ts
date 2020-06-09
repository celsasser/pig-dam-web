/**
 * Date: 6/8/20
 * Time: 10:18 PM
 * @license MIT (see project's LICENSE file)
 */

import {HttpRouteFactory} from "../../../src/route";
import {createTestLogger} from "../../support/factory/logger";

describe("route.factory", function() {
	describe("HttpRouteFactory", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const instance = new HttpRouteFactory(logger);
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
			});
		});
	});
});
