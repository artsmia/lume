'use strict'
const Content = require('../db/models/Content')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('content', 'mapUrl', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.addColumn('content', 'mapKey', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.sequelize.query('UPDATE content SET mapUrl = "";'),
      queryInterface.sequelize.query('UPDATE content SET mapKey = "";'),
      queryInterface.sequelize.query(
        "ALTER TABLE content CHANGE type type ENUM('comparison', 'detail', 'movie', 'obj', 'picture', 'map');"
      )
    ]
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('content', 'mapUrl', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.removeColumn('content', 'mapKey', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.sequelize.query(
        "ALTER TABLE content CHANGE type type ENUM('comparison', 'detail', 'movie', 'obj', 'picture');"
      )
    ]
  }
}
