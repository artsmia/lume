import Sequelize from 'sequelize'
import db from '../connect'

const storyObj = db.define("story_obj", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default storyObj
