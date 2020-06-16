/**
 * Date: 6/8/20
 * Time: 10:18 PM
 * @license MIT (see project's LICENSE file)
 */

import {HttpRouteFactory, MetaRoute} from "../../../src";
import {
	CommandHttpRouteTest,
	createTestLogger,
	createTestRequest,
	createTestResponse
} from "../../support/factory";

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

	describe("addHandler", function() {
		it("should properly add the path and handler to the specified method", function() {
			const instance = new HttpRouteFactory(createTestLogger());
			const route: MetaRoute<CommandHttpRouteTest> = {
				Command: CommandHttpRouteTest,
				method: jest.fn(),
				path: "/path"
			};
			const handler = instance.addHandler(route);
			expect(route.method)
				.toBeCalledWith(route.path, handler);
		});
	});

	describe("processRequest", function() {
		beforeEach(function() {
			jest.spyOn(CommandHttpRouteTest.prototype, "execute");
		});

		it("should properly construct the handling command and call its execute", async function() {
			const instance = new HttpRouteFactory(createTestLogger());
			const route: MetaRoute<CommandHttpRouteTest> = {
				Command: CommandHttpRouteTest,
				method: jest.fn(),
				path: "/path"
			};
			const handler = instance.addHandler(route);
			const request = createTestRequest();
			const response = createTestResponse();
			const next = jest.fn();
			return handler(request, response, next)
				.then(() => {
					expect(CommandHttpRouteTest.prototype.execute)
						.toHaveBeenCalledWith();
					expect(next)
						.toHaveBeenCalledWith();
				});
		});
	});
});
