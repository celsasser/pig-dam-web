/**
 * Date: 6/8/20
 * Time: 7:03 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	IRouterMatcher,
	PathParams,
	Request,
	Response,
	Router
} from "express-serve-static-core";
import {LogBase} from "pig-dam-core";
import {CommandHttpRouteHandler} from "../route";

/**
 * Interface for a constructable route handler command
 */
export type HttpRouteCommand <T extends CommandHttpRouteHandler> = new ({id, logger, path, req, res, traceId}: {
		id?: string,
		logger: LogBase,
		path: PathParams,
		req: Request,
		res: Response,
		traceId?: string
	}) => T;

/**
 * Description of a route that we use in our factory to handle route requests via commands
 */
export interface MetaRoute <T extends CommandHttpRouteHandler> {
	/**
	 * Instance of this command will be created to handle the request
	 */
	Command: HttpRouteCommand<T>;
	/**
	 * This is one of expresses router HTTP methods: all|delete|head|options|put|post|put....
	 */
	method: IRouterMatcher<Router>;
	/**
	 * The path pattern that must be matched to be handled by this meta route
	 */
	path: PathParams;
}
