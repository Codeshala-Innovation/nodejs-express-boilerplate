// @flow
'use strict';

import * as http from 'http';
import { normalizePort } from './utils';
import { app, appData, sequelize } from './app';

const port = normalizePort(process.env.PORT);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`${port} is the magic port!!`);
});

export { server, appData, sequelize };
