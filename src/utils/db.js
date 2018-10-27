// @flow

import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(config.db.url, {
  dbName: config.db.name,
  user: config.db.username,
  pass: config.db.password
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
