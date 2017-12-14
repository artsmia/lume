import Sequelize from 'sequelize'
import db from '../connect'

const Story_Picture = db.define("story_picture", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default Story_Picture
