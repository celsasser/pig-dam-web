/**
 * Date: 6/8/20
 * Time: 10:18 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request, Response} from "express";
import {CommandHttpRouteHandler} from "../../../src/route";
import {
	createTestLogger,
	createTestRequest,
	createTestResponse
} from "../../support/factory";

describe("route.instance", function() {
	describe("CommandHttpRouteHandler", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const path = /path/;
				const req: Request = createTestRequest();
				const res: Response = createTestResponse();
				// @ts-ignore
				const instance = new CommandHttpRouteHandler({logger, path, req, res,
					traceId: "urn:dam:trace:id"
				});
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
				expect(instance.path).toEqual(path);
				// @ts-ignore
				expect(instance.req).toStrictEqual(req);
				// @ts-ignore
				expect(instance.res).toStrictEqual(res);
				expect(instance.traceId).toEqual("urn:dam:trace:id");
			});
		});
	});
});
