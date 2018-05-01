
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({
    path: `.env.${process.env.DEPLOYMENT_ENV}`
  })
}

require('./api.js')
