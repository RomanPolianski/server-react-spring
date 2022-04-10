const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD , {
    dialect: 'postgres',
    host: process.env.DATABASE_URL
})

const Projects = require('./models/Projects')(sequelize);
const Users = require('./models/Users')(sequelize);

module.exports = {
    sequelize: sequelize,
    projects: Projects,
    users: Users
}
