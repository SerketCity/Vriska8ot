const Sequelize = require('sequelize');
const { connection } = require('./db.js')

const Users = require('./models/Users.js')(connection, Sequelize.DataTypes);

module.exports = { Users };
