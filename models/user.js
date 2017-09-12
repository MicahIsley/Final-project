'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    profilePicUrl: DataTypes.TEXT,
    email: DataTypes.STRING,
    accesToken: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT,
    googleId: DataTypes.TEXT,
    companyToken: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};