/**
 * Date: 6/8/20
 * Time: 10:19 PM
 * @license MIT (see project's LICENSE file)
 */

import {LogBase} from "pig-dam-core";
import {CommandHttpServer} from "../../../src/server";
import {HttpProtocol} from "../../../src/types/http";
import {createTestLogger} from "../../support/factory/logger";

describe("CommandHttpServer", function() {
	/**
	 * Creates an instance of CommandHttpServer
	 */
	function createInstance({
		logger = createTestLogger(),
		port = 8000,
		protocol = HttpProtocol.HTTP
	}: {
		logger?: LogBase,
		port?: number,
		protocol?: HttpProtocol,
	} = {}): CommandHttpServer {
		return new CommandHttpServer({
			logger,
			port,
			protocol
		});
	}

	describe("constructor", function() {
		it("should properly setup an instance", function() {
			const logger = createTestLogger();
			const port = 8000;
			const protocol = HttpProtocol.HTTP;
			const instance = new CommandHttpServer({
				logger,
				port,
				protocol
			});
			expect(instance.express).toBeDefined();
			expect(instance.port).toEqual(port);
			expect(instance.protocol).toEqual(protocol);
			expect(instance.router).toBeDefined();
			// @ts-ignore
			expect(instance.logger).toEqual(logger);
		});
	});
});
