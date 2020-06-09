/**
 * Date: 6/8/20
 * Time: 5:55 PM
 * @license MIT (see project's LICENSE file)
 */

import {PathParams, Request, Response} from "express-serve-static-core";
import {CommandBase, CommandMetadataType} from "pig-dam-cmd";
import {LogBase} from "pig-dam-core";

/**
 * Base class for all route commands.
 */
export abstract class CommandHttpRouteHandler extends CommandBase<void> {
	public readonly path: PathParams;
	protected readonly req: Request;
	protected readonly res: Response;
	protected readonly logger: LogBase;

	constructor({id, logger, path, req, res, traceId}: {
		id?: string,
		logger: LogBase,
		path: PathParams,
		req: Request,
		res: Response,
		traceId?: string
	}) {
		super({id, traceId});
		this.logger = logger;
		this.path = path;
		this.req = req;
		this.res = res;
	}

	/**
	 * Merges in request info
	 */
	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			body: this.req.body,
			cookies: this.req.cookies,
			headers: this.req.headers,
			method: this.req.method,
			protocol: this.req.protocol,
			remoteIP: this.req.ip,
			url: this.req.url
		});
	}
}
