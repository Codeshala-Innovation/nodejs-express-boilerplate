// @flow

import * as http from "http";
import { normalizePort } from "./utils";
import app from "./app";

const port = normalizePort(process.env.PORT);

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`${port} is the magic port!!`);
});

export { server };
