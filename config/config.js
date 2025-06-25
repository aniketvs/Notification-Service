const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure dotenv is loaded

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
 process.env.PASSWORD ?? '',
  {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'mysql', // Using MySQL dialect
    logging: false, // Disable logging (optional)
    retry: { max: 3 } // Retry connection (optional)
  }
);

module.exports = sequelize;
