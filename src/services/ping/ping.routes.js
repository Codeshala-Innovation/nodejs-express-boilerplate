// @flow

import { Get } from "./ping.controller";

export default (app: Object) => {
  app.route("/ping").get(Get);
};
