'use strict';
module.exports = function(sequelize, DataTypes) {
  var Survey = sequelize.define('Survey', {
    username: DataTypes.STRING,
    q1: DataTypes.INTEGER,
    q2: DataTypes.INTEGER,
    q3: DataTypes.INTEGER,
    q4: DataTypes.INTEGER,
    q5: DataTypes.INTEGER,
    q6: DataTypes.INTEGER,
    q7: DataTypes.INTEGER,
    q8: DataTypes.INTEGER,
    q9: DataTypes.INTEGER,
    q10: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Survey;
};