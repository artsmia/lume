const webpack = require('webpack')

module.exports = {


  webpack: (config, { dev }) => {

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.NEXT_URL': JSON.stringify(process.env.NEXT_URL),
        'process.env.FILE_STORAGE': JSON.stringify(process.env.FILE_STORAGE),
        'process.env.AUTH_STRATEGY': JSON.stringify(process.env.AUTH_STRATEGY)
      })
    )


    return config
  },
}
