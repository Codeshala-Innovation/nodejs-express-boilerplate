// @flow
'use strict';
import express from 'express';

// We use http Restful API convention
// this util will automatically generate routes for the following verbs from controller
const verbsAllowed = ['get', 'post', 'patch', 'put', 'delete'];

type appType = {
  routes: []
};

const createApi = (app: appType) => (path: string, verbs: Object, options: Object = {}) => {
  const Router = express.Router();
  const { middleware } = options;
  if (middleware) middleware.forEach((fn) => Router.use(fn));

  for (let verb in verbs) {
    const verbFunction: string = verb.toLowerCase();
    if (verbsAllowed.indexOf(verbFunction) === -1) return;
    // $FlowIgnore:
    Router[verbFunction](path, verbs[verb]);
    app.routes.push(`${verb} ${path}`);
  }
  return Router;
};

const createRoute = (app: appType) => (path: string, verb: string, handler: Function, options: Object = {}) => {
  const Router = express.Router();
  const { middleware } = options;
  if (middleware) middleware.forEach((fn) => Router.use(fn));

  // $FlowIgnore:
  Router[verb](path, handler);
  app.routes.push(`${verb} ${path}`);
  return Router
};

export { createApi, createRoute };