// @flow

import passport from "passport";
import passwordHash from "password-hash";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";

import models from "../models";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = models;
// Todo
// 1. We need to store token somewhere
// 2. We need to check if token if it's stored or not while authenticating
// 3. We need to destroy saved tokens on logout
// 4. We need to delete all tokens on password reset

export default () => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, cb) =>
        User.findOne({ where: { email } })
          .then(user => {
            if (user) {
              return cb(null, false, { error: "User already exists." });
            }

            return User.sync();
          })
          .then(() => {
            password = passwordHash.generate(password);
            return User.create({ email, password });
          })
          .then(() => User.findOne({ where: { email } }))
          .then(user => cb(null, user.dataValues))
          .catch(err => cb(err))
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, cb) =>
        User.findOne({ where: { email } })
          .then(user => {
            if (!user) {
              return cb(null, false, { error: "User does not exist." });
            }

            if (passwordHash.verify(password, user.dataValues.password)) {
              return cb(null, user.dataValues);
            }
            return cb(null, false, { error: "Invalid Password." });
          })
          .catch(err => cb(err))
    )
  );

  passport.use(
    "auth-check",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      (jwtPayload, cb) =>
        User.findById(jwtPayload.id)
          .then(user => {
            if (user) {
              return cb(null, user);
            }
            return cb(null, null, { message: "User not authorized!" });
          })
          .catch(err => cb(err))
    )
  );
};
