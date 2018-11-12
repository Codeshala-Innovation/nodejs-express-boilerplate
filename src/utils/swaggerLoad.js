import YAML from "js-yaml";
import fs from "fs";
import { resolveRefs as resolve } from "json-refs";
import swaggerUi from "swagger-ui-express";

const parser = directory => {
  // Documentation
  const root = YAML.load(fs.readFileSync(directory).toString());
  const options = {
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent(res, callback) {
        callback(null, YAML.safeLoad(res.text));
      }
    }
  };

  return resolve(root, options);
};

const swaggerLoad = (app, directory) => {
  parser(directory).then(document =>
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(document.resolved))
  );
};

export default swaggerLoad;
