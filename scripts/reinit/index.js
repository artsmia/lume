require('dotenv').config({
  path: `.env.${process.env.DEPLOYMENT_ENV}`
})

require('./reinit.js')
