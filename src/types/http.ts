/**
 * Date: 6/8/20
 * Time: 6:03 PM
 * @license MIT (see project's LICENSE file)
 */

/**
 * HTTP protocols
 */
import * as express from "express";
import * as net from "net";

export enum HttpProtocol {
	HTTP = "HTTP",
	HTTPS = "HTTPS"
}

/**
 * A suite of players in the server game. Not such a hot name.
 */
export interface HttpServerConfiguration {
	application: express.Application;
	router: express.Router;
	server: net.Server;
}
