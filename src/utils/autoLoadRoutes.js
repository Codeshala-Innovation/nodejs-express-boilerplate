// @flow
import * as fs from 'fs';
import path from 'path';

export default app => {
  fs.readdir(path.resolve(__dirname, '../services'), function (err, folders) {
    folders.forEach(folder => {
      fs.readdir(path.resolve(__dirname, '../services', folder), function (err, files) {
        const requiredFiles = files.filter(file => file.match(/.routes.js$/));
        requiredFiles.forEach(file => require(path.resolve(__dirname, '../services', folder, file))(app));
      })
    });
  });
};
