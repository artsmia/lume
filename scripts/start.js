var program = require('commander')

program
  .arguments('<file>')
  .option('-e, --env <env>', 'The current environment')
  .parse(process.argv)

console.log(program.env)
