var program = require('commander')

program
  .arguments('<file>')
  .option('-e, --env <env>', 'The current environment')
  .option('-db, --database <database>', 'The current database')
  .parse(process.argv)

console.log(program.env)
