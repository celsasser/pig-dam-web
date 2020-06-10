/**
 * Date: 6/8/20
 * Time: 5:58 PM
 * @license MIT (see project's LICENSE file)
 */

import {Server} from "net";
import {CommandBase, CommandMetadataType} from "pig-dam-cmd";
import {LogBase, PigError} from "pig-dam-core";
import {HttpProtocol} from "../types/http";

/**
 * An express HTTP/HTTPS server
 */
export class CommandHttpServer extends CommandBase<void> {
	/**
	 * The port on which this fellow will listen
	 */
	public readonly port: number;
	public readonly protocol: HttpProtocol;
	/**
	 * The heart of our little operation
	 */
	public readonly server: Server;
	private readonly logger: LogBase;

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Construction
	 */
	public constructor({
		id, logger, server, traceId,
		port = 8050
	}: {
		id?: string,
		logger: LogBase,
		port?: number,
		server: Server,
		traceId?: string
	}) {
		super({id, traceId});
		this.logger = logger;
		this.port = port;
		this.protocol = (server instanceof require("https").Server)
			? HttpProtocol.HTTPS
			: HttpProtocol.HTTP;
		this.server = server;
	}

	public get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			port: this.port,
			protocol: this.protocol
		});
	}

	/********************
	 * Private Interface
	 ********************/
	protected _execute(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server.on("close", () => {
				this.logger.info(`server listening on ${this.protocol.toLowerCase()}://localhost:${this.port} was closed`, {
					metadata: this.metadata,
					moduleId: "pig-dam-web",
					traceId: this.traceId
				});
			});
			this.server.on("error", (error: Error) => {
				reject(new PigError({
					error,
					message: `unable to start ${this.protocol} server on port ${this.port} - ${error.message}`
				}));
			});
			this.server.listen(this.port, (): void => {
				this.logger.info(`server listening on ${this.protocol.toLowerCase()}://localhost:${this.port}`, {
					metadata: this.metadata,
					moduleId: "pig-dam-web",
					traceId: this.traceId
				});
				resolve();
			});
		});
	}
}
