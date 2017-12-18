import Sequelize from 'sequelize'
import {Image} from '../../db/models'

export default {
  image1Id: {
    type: Sequelize.UUID,
    references: {
      model: Image,
      key: 'id'
    }
  }
}
