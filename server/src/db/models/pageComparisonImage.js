import Sequelize from 'sequelize'
import db from '../connect'

const pageComparisonImage = db.define("page_comparisonImage", {
  index: {
    type: Sequelize.INTEGER,
  }
},{
  freezeTableName: true
})

export default pageComparisonImage
