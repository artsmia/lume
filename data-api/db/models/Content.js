import Sequelize from 'sequelize'
import db from '../connect'

const Content = db.define(
  'content',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    type: {
      type: Sequelize.ENUM,
      values: ['comparison', 'detail', 'movie', 'obj', 'picture', 'map'],
      allowNull: false,
      defaultValue: 'picture'
    },
    index: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    geoJSON: {
      type: Sequelize.JSON
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mapUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    mapKey: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
    // storyId: {
    //   type: Sequelize.UUID,
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   references: {
    //     model: "story",
    //     key: "id"
    //   },
    // },
    // image0Id:{
    //     type: Sequelize.UUID,
    //     allowNull: true,
    //     references: {
    //       model: "image",
    //       key: "id"
    //     },
    //     onDelete: "SET NULL",
    //     onUpdate: "CASCADE"
    //   },
    // image1Id:{
    //     type: Sequelize.UUID,
    //     allowNull: true,
    //     references: {
    //       model: "image",
    //       key: "id"
    //     },
    //     onDelete: "SET NULL",
    //     onUpdate: "CASCADE"
    //   },
    // objId:{
    //     type: Sequelize.UUID,
    //     allowNull: true,
    //     onDelete: "SET NULL",
    //     onUpdate: "CASCADE",
    //     references: {
    //       model: 'obj',
    //       key: 'id'
    //     }
    //   }
  },
  {
    freezeTableName: true
  }
)

export default Content
