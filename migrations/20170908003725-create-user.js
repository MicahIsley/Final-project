'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      profilePicUrl: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      accesToken: {
        type: Sequelize.TEXT
      },
      refreshToken: {
        type: Sequelize.TEXT
      },
      googleId: {
        type: Sequelize.TEXT
      },
      companyToken: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('users');
  }
};