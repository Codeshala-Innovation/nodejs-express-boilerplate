// @flow

// Todo
// Add helmet protection
// Hide identity

/*
* Dependency
* */
import express from 'express';
// import passport from 'passport';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import cors from 'cors';

import { autoLoadRoutes } from './utils';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Employ passport
// app.use(passport.initialize());

/*
* Access Logger
* */

const accessLog = path.join(__dirname, '../../logs');

fs.existsSync(accessLog) || fs.mkdirSync(accessLog);

// Todo
// Check this properly

const accessLogStream = rfs((time, index) => time ? `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${index}.log` : `access-${index}.log`, {
  interval: '1d',
  path: accessLog
});
const logger = morgan('short', { stream: accessLogStream});

app.use(logger);


// Load routes
autoLoadRoutes(app)(path.resolve(__dirname, 'services'));

export { app };
