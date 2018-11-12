// @flow
import * as fs from "fs";
import path from "path";

export const findRoutes = (directory: string, callback: Function) => {
  fs.readdir(path.resolve(directory), (err, folders) => {
    if (err) return callback(err);

    let asyncCount = 0;
    let routes = [];
    folders.forEach(folder => {
      if (fs.lstatSync(path.resolve(directory, folder)).isDirectory()) {
        fs.readdir(path.resolve(directory, folder), (err, files) => {
          if (err) return callback(err);

          const requiredFiles = files
            .filter(file => file.match(/.routes.js$/))
            .map(file => path.resolve(directory, folder, file));
          routes = [...routes, ...requiredFiles];

          asyncCount++;
          if (asyncCount === folders.length) return callback(null, routes);
        });
      } else {
        asyncCount++;
        if (asyncCount === folders.length) return callback(null, routes);
      }
    });
  });
};

export default (app: Object) => (directory: string) => {
  findRoutes(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      require(file).default(app);
    });
  });
};
