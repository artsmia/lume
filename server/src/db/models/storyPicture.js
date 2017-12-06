import Sequelize from 'sequelize'
import db from '../connect'

const storyPicture = db.define("story_picture", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default storyPicture
