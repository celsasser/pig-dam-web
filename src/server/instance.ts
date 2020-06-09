/**
 * Date: 6/8/20
 * Time: 5:58 PM
 * @license MIT (see project's LICENSE file)
 */
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import {CommandBase, CommandMetadataType} from "pig-dam-cmd";
import {LogBase, PigError} from "pig-dam-core";
import {HttpProtocol} from "../types/http";

/**
 * An express HTTP/HTTPS server
 */
export class CommandHttpServer extends CommandBase<void> {
	/**
	 * So that you may look and hook him up to terminating command.
	 */
	public readonly express: express.Express;
	/**
	 * The port on which this fellow will listen
	 */
	public readonly port: number;
	/**
	 * Determines which NodeJS protocol module we use.
	 */
	public readonly protocol: HttpProtocol;
	/**
	 * Publicly exposed router through which all proxy traffic may be added
	 */
	public readonly router: express.Router;
	private readonly logger: LogBase;

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Construction
	 */
	public constructor({id, logger, traceId,
		port = 8050,
		protocol = HttpProtocol.HTTP
	}: {
		id?: string,
		logger: LogBase,
		port: number,
		protocol: HttpProtocol,
		traceId?: string
	}) {
		super({id, traceId});
		this.logger = logger;
		this.port = port;
		this.protocol = protocol;
		this.express = express();
		this.router = express.Router();
		this.configureExpress();
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
		const protocol = (this.protocol === HttpProtocol.HTTP)
			? require("http")
			: require("https");
		const server = protocol.createServer(this.express);
		return new Promise((resolve, reject) => {
			server.on("close", () => {
				this.logger.info(`server listening on ${this.protocol.toLowerCase()}://localhost:${this.port} was closed`, {
					metadata: this.metadata,
					moduleId: "pig-dam-web",
					traceId: this.traceId
				});
			});
			server.on("error", (error: Error) => {
				reject(new PigError({
					error,
					message: `unable to start ${this.protocol} server on port ${this.port} - ${error.message}`
				}));
			});
			server.listen(this.port, () => {
				this.logger.info(`server listening on ${this.protocol.toLowerCase()}://localhost:${this.port}`, {
					metadata: this.metadata,
					moduleId: "pig-dam-web",
					traceId: this.traceId
				});
				resolve();
			});
		});
	}

	private configureExpress(): void {
		this.express.set("port", this.port);
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.text());
		this.express.use(bodyParser.raw());
		// todo: is this how we want to log client requests? And do we want to hook it up to `logger`?
		this.express.use(morgan('[:date[iso]] ":method :url HTTP/:http-version" status=:status length=:res[content-length] remote=:remote-addr agent=":user-agent"'));
		this.express.use("/", this.router);
	}
}
