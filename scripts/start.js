var program = require('commander')

program
  .option('-e, --env <dev|production>', 'environment configuration', 'dev')
  .option('-db, --database <local|dev>', 'database configuration', 'local')
  .option('-fs, --filestorage <local|s3>', 'filestorage provider', 'local')
  .option('-u, --authentication <local|auth0>', 'authentication strategy', 'local')
  .option('-n, --next', 'start next')
  .option('-a, --api', 'start api')
  .parse(process.argv)


process.env.NODE_ENV = program.env

process.env.DATABASE = program.database

process.env.FILE_STORAGE = program.filestorage

process.env.AUTH_STRATEGY = program.authentication

if (program.env === 'dev') {

  if (program.api){
    process.env.BABEL_ENV = 'api'
    require("babel-register")
    var api = require('../api/index.js')
  } else if (program.next){
    process.env.BABEL_ENV = 'next'
    var router = require('../router')
  }
}
