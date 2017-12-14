import Sequelize from 'sequelize'
import db from '../connect'

const Story_Movie = db.define("story_movie", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default Story_Movie
