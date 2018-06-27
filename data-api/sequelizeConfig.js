require('babel-core/register')
require('dotenv').config({
  path: '../config/.env'
})
const path = require('path')

module.exports = {
  'models-path': path.resolve('db', 'models'),
  'migrations-path': path.resolve('', 'migrations')
}
