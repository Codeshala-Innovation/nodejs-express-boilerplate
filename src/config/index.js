// @flow
import db from "./db";

// Todo
// Check if the env are environments are valid

const config = {};
config.db = db[process.env.NODE_ENV];

export default config;
