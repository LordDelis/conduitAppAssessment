const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('sequelize').Options} */
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || 'mysecretpassword',
    database: process.env.DEV_DB_NAME || 'database_development',
    host: process.env.DEV_DB_HOSTNAME || '127.0.0.1',
    port: process.env.DEV_DB_PORT || 3306,
    dialect: process.env.DEV_DB_DIALECT || 'mysql',
    logging: process.env.DEV_DB_LOGGING === 'true' || process.env.DEV_DB_LOGGGIN === 'true',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    dialect: process.env.TEST_DB_DIALECT || 'mysql',
    logging: process.env.TEST_DB_LOGGING === 'true',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: process.env.PROD_DB_DIALECT || 'mysql',
    logging: process.env.PROD_DB_LOGGING === 'true',
  },
};