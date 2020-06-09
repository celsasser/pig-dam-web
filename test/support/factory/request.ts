/**
 * Date: 6/8/20
 * Time: 10:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {mock} from "jest-mock-extended";

export function createTestRequest(): Request {
	return mock<Request>();
}
