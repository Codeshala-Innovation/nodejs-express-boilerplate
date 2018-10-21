// @flow
import models from '../models';

const { Website, User } = models;

export const Get = function (req: Object, res: Object) {
  return Website.findAll({})
    .then((websites) => {
      return res.status(200).json({
        data: websites
      });
    });
};

export const Post = function (req: Object, res: Object) {
  const { name, url } = req.body;
  if (!name || !url) {
    res.status(400).json({
      error: 'Please provide both name and url'
    });
  }

  Website.create({ name, url })
    .then((website) => {
      return User.findById(req.user.id)
        .then(user => {
          return user.addWebsite(website);
        })
        .then(() => {
          return Website.findById(website.dataValues.id);
        });
    }).then((website) => {
      const { dataValues } = website;
      return res.status(200).json(dataValues);
    });
};


