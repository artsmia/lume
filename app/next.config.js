const rimraf = require('rimraf')
module.exports = {


  webpack: (config, { dev }) => {
    return config
  },
  webpackDevMiddleware: (config) => {
    rimraf('./node_modules/.cache', (response) => {
      console.log("Cache deleted", response)
    })

    return config
  }
}
