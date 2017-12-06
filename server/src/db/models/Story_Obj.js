import Sequelize from 'sequelize'
import db from '../connect'

const Story_Obj = db.define("story_obj", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default Story_Obj
