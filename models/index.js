const { Sequelize } = require('sequelize');
const database = {};

const options = {
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres'
};

const sequelize = new Sequelize(options);

sequelize.authenticate()
  .then(() => console.log(`CONNECTION SUCCESS: ${options.database}`))
  .catch((error) => console.log(`CONNECTION ERROR: ${error}`))

  database.sequelize = sequelize
  
  module.exports = database