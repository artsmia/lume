require('dotenv').config({
  path: `.env.${process.env.DEPLOYMENT_ENV}`
})

require('./tiler.js')
