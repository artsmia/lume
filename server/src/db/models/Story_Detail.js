import Sequelize from 'sequelize'
import db from '../connect'

const Story_Detail = db.define("story_detail", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default Story_Detail
