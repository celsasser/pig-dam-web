/**
 * Date: 6/8/20
 * Time: 10:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";

/**
 * Returns a Request mock. Mock methods as needed.
 */
export function createTestRequest(): Request {
	return {
		headers: {}
	} as Request;
}
