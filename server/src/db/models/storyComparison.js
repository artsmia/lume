import Sequelize from 'sequelize'
import db from '../connect'

const storyComparison = db.define("story_comparison", {
  index: {
    type: Sequelize.INTEGER
  }
},{
  freezeTableName: true
})

export default storyComparison
