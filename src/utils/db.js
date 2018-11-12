// @flow

import mongoose from "mongoose";

const connectDataBase = (dbConfig: Object) => {
  mongoose.connect(
    dbConfig.url,
    {
      dbName: dbConfig.name,
      user: dbConfig.username,
      pass: dbConfig.password,
      useNewUrlParser: true
    }
  );

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;

  // Todo
  // Throw an exception and log error
  // API won't work if database connection is failed

  // eslint-disable-next-line no-console
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  return db;
};

export default connectDataBase;
