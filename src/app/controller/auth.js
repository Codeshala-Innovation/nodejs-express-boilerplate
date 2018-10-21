// @flow

import passport from 'passport';
import jwt from 'jsonwebtoken';

export const signup = (req: Object, res: Object, next: Function) => {
  passport.authenticate('signup', {session: false}, (err, user, info) => {
    // Todo
    // Here some how even after return statement, program's flow goes to next line
    // Creating error: Can't set headers after they are sent.

    if (err || !user) {
      return res.status(400).json({
        error: (err && err.message) || (info && info.error) || 'something is not right.'
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.status(200).json({
        session: token
      });
    });
  })(req, res);
};

export const login = (req: Object, res: Object, next: Function) => {
  passport.authenticate('login', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        error: (err && err.message) || (info && info.error) || 'something is not right.'
      });
    }

    // Is this necessary?
    // Cause passport js says that req.login() is called automatically after passport.authenticate
    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.status(200).json({
       session: token
      });
    });
  })(req, res);
};

