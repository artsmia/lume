module.exports = {
  development: {
    "username": "root",
    "password": null,
    "database": "lume",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "user_env_variable": process.env.DB_URL_PROD
  }
}
