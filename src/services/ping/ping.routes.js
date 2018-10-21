// @flow

import { Get } from "./ping.controller";

export default app => {
  app.route('/ping').get(Get);
}
