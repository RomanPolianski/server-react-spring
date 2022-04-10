const { Sequelize } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define(
    'users',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
