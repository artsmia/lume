import Sequelize from 'sequelize'
import Image from '../../db/models/Image'

export default {
  title: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ""
  },
  image0Id: {
    type: Sequelize.UUID,
    references: {
      model: Image,
      key: 'id'
    }
  },
}
