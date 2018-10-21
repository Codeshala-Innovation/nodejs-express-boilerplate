// @flow
'use strict';

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import cors from 'cors';

import { createApi, createRoute } from '../utils';
import { auth as authMiddleware } from './middleware';

// Import auth
import auth from './auth/passport';

// Import controllers
import * as pingController from './controller/ping';
import * as userController from './controller/auth';
import * as websiteController from './controller/website';

// Import sequelize
import { sequelize } from "./models";

const app = express();
const Router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Employ passport
app.use(passport.initialize());


// Logger
const accessLog = path.join(__dirname, '../../logs');
fs.existsSync(accessLog) || fs.mkdirSync(accessLog);
const accessLogStream = rfs((time, index) => time ? `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${index}.log` : `access-${index}.log`, {
  interval: '1d',
  path: accessLog
});
const logger = morgan('short', { stream: accessLogStream});
app.use(logger);

/*
* ----------------
* App Data
* ----------------
* */
const appData : {
  routes: []
} = {
  routes: []
};


/*
* ----------------
* Auth
* Setup
* ----------------
* */
auth();

/*
* ----------------
* Router
* Setup
* ----------------
* */
const api = createApi(appData);
const route = createRoute(appData);

// Ping route
const PingRoute = api('/ping', pingController);

Router.use('/', PingRoute);

// Auth routes
const LoginRoute = route('/login', 'post', userController.login);
const SignupRoute = route('/signup', 'post', userController.signup);

const WebsiteRoute = api('/website', websiteController, { middleware: [authMiddleware] });

Router.use('/user', LoginRoute);
Router.use('/user', SignupRoute);
Router.use('/', WebsiteRoute);

app.use(Router);

console.info('Routes');
appData.routes.forEach(route => console.info(route));

export { app, appData, sequelize };
