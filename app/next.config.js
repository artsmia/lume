const webpack = require("webpack")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "../config/.env"
  })
}

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NOW_URL": JSON.stringify(process.env.NOW_URL),
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
        "process.env.S3_URL": JSON.stringify(process.env.S3_URL),
        "process.env.AUTH_STRATEGY": JSON.stringify(process.env.AUTH_STRATEGY),
        "process.env.FILE_STORAGE": JSON.stringify(process.env.FILE_STORAGE),
        "process.env.LOCAL_TILE_URL": JSON.stringify(process.env.LOCAL_TILE_URL)
      })
    )
    return config
  }
}
