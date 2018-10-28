// @flow

import mongoose from 'mongoose';

const connectDataBase = (dbConfig: Object) => {
  mongoose.connect(dbConfig.url, {
    dbName: dbConfig.name,
    user: dbConfig.username,
    pass: dbConfig.password
  });

  mongoose.Promise = global.Promise;

  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  return db;
};

export default connectDataBase;
