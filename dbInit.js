const Sequelize = require('sequelize');
const { connection } = require('./db.js')

require('./models/Users.js')(connection, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

connection.sync({ force }).then(async () => {
	console.log('Database synced');

	connection.close();
}).catch(console.error);
