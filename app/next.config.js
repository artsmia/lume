const webpack = require('webpack')
//const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config')
}

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CMS_URL': JSON.stringify(process.env.CMS_URL),
        'process.env.LUME_URL': JSON.stringify(process.env.LUME_URL),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.S3_URL': JSON.stringify(process.env.S3_URL),
        'process.env.AUTH_STRATEGY': JSON.stringify(process.env.AUTH_STRATEGY),
        'process.env.FILE_STORAGE': JSON.stringify(process.env.FILE_STORAGE),
        'process.env.LOCAL_TILE_URL': JSON.stringify(
          process.env.LOCAL_TILE_URL
        ),
        'process.env.MAPBOX_API_TOKEN': JSON.stringify(
          process.env.MAPBOX_API_TOKEN
        )
      })
    )
    return config
  }
  // exportPathMap: function(defaultPathMap) {
  //   const data = JSON.parse(
  //     fs.readFileSync(`${__dirname}/../data-api/export/data.json`, 'utf8')
  //   )
  //   return {
  //     '/mia': {
  //       page: '/lume',
  //       query: {
  //         subdomain: 'mia',
  //         data
  //       }
  //     },
  //     '/mia/duluth-living-room': {
  //       page: '/lume/story',
  //       query: {
  //         subdomain: 'mia',
  //         storySlug: 'duluth-living-room',
  //         organization: data.organization,
  //         story: data.stories.find(
  //           story => story.storySlug === 'duluth-living-room'
  //         )
  //       }
  //     }
  //   }
  // }
}
