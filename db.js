const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

const Projects = require('./models/Projects')(sequelize);
const Users = require('./models/Users')(sequelize);

module.exports = {
    sequelize: sequelize,
    projects: Projects,
    users: Users
}
