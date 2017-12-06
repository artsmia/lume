import Sequelize from 'sequelize'
import db from '../connect'

const storyMovie = db.define("story_movie", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default storyMovie
