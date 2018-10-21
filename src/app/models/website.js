'use strict';

export default (sequelize, DataTypes) => {
  var Website = sequelize.define('Website', {
    name: DataTypes.TEXT,
    url: DataTypes.TEXT,
    status: DataTypes.ENUM('Online', 'Offline')
  }, {});
  Website.associate = function(models) {
    Website.belongsTo(models.User);
  };
  return Website;
};