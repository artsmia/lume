import Sequelize from "sequelize"
import db from "../connect"

const Content = db.define(
  "content",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    type: {
      type: Sequelize.ENUM,
      values: ["comparison", "detail", "movie", "obj", "picture"],
      allowNull: false,
      defaultValue: "picture"
    },
    index: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    geoJSON: {
      type: Sequelize.JSON
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    image0Id:
      process.env.DB_MODE !== "sqlite"
        ? {
            type: Sequelize.UUID
            // references: {
            //   model: "image",
            //   key: "id"
            // },
            // onDelete: "SET NULL",
            // onUpdate: "CASCADE"
          }
        : {
            type: Sequelize.UUID
          },
    image1Id:
      process.env.DB_MODE !== "sqlite"
        ? {
            type: Sequelize.UUID,
            references: {
              model: "image",
              key: "id"
            }
          }
        : {
            type: Sequelize.UUID
          },
    objId:
      process.env.DB_MODE !== "sqlite"
        ? {
            type: Sequelize.UUID,
            references: {
              model: "obj",
              key: "id"
            }
          }
        : {
            type: Sequelize.UUID
          }
  },
  {
    freezeTableName: true
  }
)

export default Content
