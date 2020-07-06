/**
 * Date: 6/9/20
 * Time: 4:05 PM
 * @license MIT (see project's LICENSE file)
 */

/**
 * Our server isn't that complex nonetheless we find ourselves making assumptions in our server command
 * that we don't have to. Additionally, it is difficult to test when all dependencies are created within
 * the command. So we are opting for configurability with some convenience methods for quick setup.
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as net from "net";
import {HttpServerConfiguration} from "../types";

export const defaults = {
	BODY_PARSERS: [
		bodyParser.json,
		bodyParser.text,
		bodyParser.raw
	],
	LOG_FORMAT: '[:date[iso]] ":method :url HTTP/:http-version" status=:status length=:res[content-length] remote=:remote-addr agent=":user-agent"',
	ROUTER_PATH: "/"
};

/**
 * Set up body parsing middleware in the express application
 */
export function configureBodyParsers(application: express.Application, parsers = defaults.BODY_PARSERS): void {
	parsers.forEach(parser => {
		application.use(parser());
	});
}

/**
 * We are using morgan. Put him in the middleware chain with specified morgan <param>format</param>
 */
export function configureRequestLogging(application: express.Application, format = defaults.LOG_FORMAT): void {
	application.use(morgan(format));
}

/**
 * Inserts router into the middleware chain.
 */
export function configureRouter(application: express.Application, {
	router = express.Router(),
	path = defaults.ROUTER_PATH
}: {
	router?: express.Router,
	path?: string
} = {}): express.Router {
	application.use(path, router);
	return router;
}

/**
 * Creates an express application
 */
export function createExpressApplication(): express.Application {
	return express();
}

/**
 * Creates a configuration comprised of defaults with the `http` protocol
 */
export function createHttpConfiguration(): HttpServerConfiguration {
	const application = createExpressApplication();
	const router = configureRouter(application);
	const server = createHttpServer(application);
	configureBodyParsers(application);
	configureRequestLogging(application);
	return {
		application,
		router,
		server
	};
}

/**
 * Creates a configuration comprised of defaults with the `https` protocol
 */
export function createHttpsConfiguration(): HttpServerConfiguration {
	const application = createExpressApplication();
	const router = configureRouter(application);
	const server = createHttpsServer(application);
	configureBodyParsers(application);
	configureRequestLogging(application);
	return {
		application,
		router,
		server
	};
}

/**
 * Creates an `http` server
 */
export function createHttpServer(express: express.Application): net.Server {
	const http = require("http");
	return http.createServer(express);
}

/**
 * Creates an `https` server
 */
export function createHttpsServer(express: express.Application): net.Server {
	const https = require("https");
	return https.createServer(express);
}
