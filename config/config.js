require('dotenv').config()

module.exports = {
  development: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DEV,
    dialect: "postgres"
  },
  test: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    dialect: "postgres"
  },
  production: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    dialect: "postgres"
  }
}