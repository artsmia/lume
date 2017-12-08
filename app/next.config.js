const rimraf = require('rimraf')
const webpack = require('webpack')
const updateSchema = require('./apollo/updateSchema')

module.exports = {


  webpack: (config, { dev }) => {

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_CONFIG': JSON.stringify(process.env.API_CONFIG),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    )


    return config
  },
}
