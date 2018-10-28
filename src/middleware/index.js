// @flow

import passport from 'passport';

export const auth = (req: Object, res: Object, next: Function) => {
  passport.authenticate('auth-check', {session: false}, (err, user, info, status) => {
    if (err) {
      return res.status(400).json({
        error: (err && err.message) || (info && info.message) || 'something is not right.'
      });
    } else if (info && !user) {
      return res.status(401).json({
        error: info.message
      });
    } else {
      req.user = user.dataValues;
      next();
    }
  })(req, res);
};
