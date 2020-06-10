/**
 * Date: 6/9/20
 * Time: 9:36 PM
 * @license MIT (see project's LICENSE file)
 */

import {Server as HttpServer} from "http";
import {Server as HttpsServer} from "https";

import {
	configureBodyParsers, configureRequestLogging, configureRouter,
	createExpressApplication, createHttpConfiguration, createHttpsConfiguration,
	createHttpServer, createHttpsServer
} from "../../../src/server";

describe("server.factory", function() {
	describe("configureBodyParsers", function() {
		it("should setup defaults as body parsers", function() {
			const application = createExpressApplication();
			configureBodyParsers(application);
			// not sure how to gain access to test insertion
		});
	});

	describe("configureRequestLogging", function() {
		it("should setup default as logging format", function() {
			const application = createExpressApplication();
			configureRequestLogging(application);
			// not sure how to gain access to test insertion
		});
	});

	describe("configureRouter", function() {
		it("should properly configure router in the application", function() {
			const application = createExpressApplication();
			const router = configureRouter(application);
			expect("get" in router).toBeTruthy();
		});
	});

	describe("createHttpConfiguration", function() {
		it("should properly configure an http configuration", function() {
			const {
				application,
				router,
				server
			} = createHttpConfiguration();
			expect(application).toBeDefined();
			expect(router).toBeDefined();
			expect(server).toBeInstanceOf(HttpServer);
		});
	});

	describe("createHttpsConfiguration", function() {
		it("should properly configure an https configuration", function() {
			const {
				application,
				router,
				server
			} = createHttpsConfiguration();
			expect(application).toBeDefined();
			expect(router).toBeDefined();
			expect(server).toBeInstanceOf(HttpsServer);
		});
	});

	describe("createExpressApplication", function() {
		it("should create an express application", function() {
			const application = createExpressApplication();
			expect("listen" in application).toBeTruthy();
		});
	});

	describe("createHttpServer", function() {
		it("should create an http server", function() {
			const application = createExpressApplication();
			const server = createHttpServer(application);
			expect(server).toBeInstanceOf(HttpServer);
		});
	});

	describe("createHttpsServer", function() {
		it("should create an https server", function() {
			const application = createExpressApplication();
			const server = createHttpsServer(application);
			expect(server).toBeInstanceOf(HttpsServer);
		});
	});
});
