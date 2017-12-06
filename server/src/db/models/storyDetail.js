import Sequelize from 'sequelize'
import db from '../connect'

const storyDetail = db.define("story_detail", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default storyDetail
