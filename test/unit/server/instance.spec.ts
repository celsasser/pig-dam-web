/**
 * Date: 6/8/20
 * Time: 10:19 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpServer, createHttpConfiguration} from "../../../src/server";
import {HttpProtocol} from "../../../src/types/http";
import {createTestLogger} from "../../support/factory";

describe("CommandHttpServer", function() {
	describe("constructor", function() {
		it("should properly setup an instance", function() {
			const logger = createTestLogger();
			const port = 8000;
			const {server} = createHttpConfiguration();
			const instance = new CommandHttpServer({
				logger,
				port,
				server
			});
			expect(instance.port).toEqual(port);
			expect(instance.protocol).toEqual(HttpProtocol.HTTP);
			// @ts-ignore
			expect(instance.logger).toEqual(logger);
		});
	});

	describe("_execute", function() {
		it("should resolve if attempt to listen succeeds", async function() {
			const logger = createTestLogger();
			const {server} = createHttpConfiguration();
			const instance = new CommandHttpServer({
				logger,
				server
			});
			// @ts-ignore
			server.listen = jest.fn((port: number, callback: () => void) => {
				expect(port).toEqual(8050);
				process.nextTick(callback);
			});
			await instance.execute();
			expect(logger.info.mock.calls[0][0])
				.toEqual("server listening on http://localhost:8050");

		});

		it("should return rejection if error is raised", function(done) {
			const logger = createTestLogger();
			const {server} = createHttpConfiguration();
			const instance = new CommandHttpServer({
				logger,
				server
			});
			server.listen = jest.fn();
			instance.execute()
				.catch(error => {
					expect(error.message)
						.toEqual("unable to start HTTP server on port 8050 - failed");
					done();
				});
			server.emit("error", new Error("failed"));
		});

		it("should properly log if connection is closed", function() {
			const logger = createTestLogger();
			const {server} = createHttpConfiguration();
			const instance = new CommandHttpServer({
				logger,
				server
			});
			server.listen = jest.fn();
			instance.execute();
			server.emit("close");
			expect(logger.info.mock.calls[0][0])
				.toEqual("server listening on http://localhost:8050 was closed");
		});

	});
});
