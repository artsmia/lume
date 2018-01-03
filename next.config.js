const webpack = require('webpack')

module.exports = {


  webpack: (config, { dev }) => {

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_CONFIG': JSON.stringify(process.env.API_CONFIG),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.FILE_STORAGE': JSON.stringify(process.env.FILE_STORAGE),
      })
    )


    return config
  },
}
