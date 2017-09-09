'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      q1: {
        type: Sequelize.INTEGER
      },
      q2: {
        type: Sequelize.INTEGER
      },
      q3: {
        type: Sequelize.INTEGER
      },
      q4: {
        type: Sequelize.INTEGER
      },
      q5: {
        type: Sequelize.INTEGER
      },
      q6: {
        type: Sequelize.INTEGER
      },
      q7: {
        type: Sequelize.INTEGER
      },
      q8: {
        type: Sequelize.INTEGER
      },
      q9: {
        type: Sequelize.INTEGER
      },
      q10: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Surveys');
  }
};