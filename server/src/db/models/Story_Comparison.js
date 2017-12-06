import Sequelize from 'sequelize'
import db from '../connect'

const Story_Comparison = db.define("story_comparison", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default Story_Comparison
