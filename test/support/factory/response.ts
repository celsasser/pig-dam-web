/**
 * Date: 6/8/20
 * Time: 10:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {Response} from "express";

/**
 * Returns a partially mocked Response. We add mocks as needed.
 */
export function createTestResponse(): Response {
	const res: Response = {} as Response;
	res.json = jest.fn().mockReturnValue(res);
	res.send = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	return res;
}
