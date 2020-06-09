/**
 * Date: 6/8/20
 * Time: 10:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {Response} from "express";
import {mock} from "jest-mock-extended";

export function createTestResponse(): Response {
	return mock<Response>();
}
