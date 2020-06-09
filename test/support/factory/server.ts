/**
 * Date: 6/8/20
 * Time: 10:37 PM
 * @license MIT (see project's LICENSE file)
 */

import * as http from "http";

export function createTestServer(): http.Server {
	const mocked = jest.genMockFromModule<typeof http>("http");
	return new mocked.Server();
}
