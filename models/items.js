'use strict';
module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define('Items', {
    username: DataTypes.STRING,
    apples: DataTypes.INTEGER,
    carrots: DataTypes.INTEGER,
    cupcakes: DataTypes.INTEGER,
    steaks: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Items;
};