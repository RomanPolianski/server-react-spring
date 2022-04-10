const { Sequelize } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define(
    'projects',
    {
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_info: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
