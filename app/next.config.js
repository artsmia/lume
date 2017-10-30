const rimraf = require('rimraf')
const webpack = require('webpack')

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
  webpackDevMiddleware: (config) => {
    rimraf('./node_modules/.cache', (response) => {
      console.log("Cache deleted", response)
    })

    return config
  }
}
