/**
 * Date: 6/8/20
 * Time: 5:55 PM
 * @license MIT (see project's LICENSE file)
 */

import {NextFunction, Request, Response} from "express";
import {LogBase} from "pig-dam-core";
import {MetaRoute} from "../types/route";
import {CommandHttpRouteHandler} from "./instance";

/**
 * A factory for both defining routes and creating handlers
 */
export class HttpRouteFactory {
	/**
	 * Logger will be used to:
	 * - log errors
	 * - passed on to route commands
	 */
	private readonly logger: LogBase;

	/**
	 * Constructor
	 */
	public constructor(logger: LogBase) {
		this.logger = logger;
	}

	/********************
	 * Public API
	 ********************/
	/**
	 * Means of defining routes and associating a command with the route
	 */
	public addHandler<T extends CommandHttpRouteHandler>(route: MetaRoute<T>): void {
		const handler = this.processRequest.bind(this, route);
		route.method(route.path, handler);
	}

	/********************
	 * Private Interface
	 ********************/
	/**
	 * Creates a command for the request and executes it.
	 */
	private async processRequest<T extends CommandHttpRouteHandler>(route: MetaRoute<T>, req: Request, res: Response, next: NextFunction): Promise<void> {
		const traceId: string|undefined = ("traceid" in req.headers)
			? req.headers.traceid as string
			: req.headers["trace-id"] as string;
		try {
			const command = new route.Command({
				logger: this.logger,
				path: route.path,
				req,
				res,
				traceId
			});
			await command.execute();
			next();
		} catch(error) {
			this.logger.error(error, {
				moduleId: "pig-dam-web",
				traceId
			});
			next(error);
		}
	}
}
