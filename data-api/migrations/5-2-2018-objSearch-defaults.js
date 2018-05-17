'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.sequelize.query(
        'UPDATE organization SET objSearchEndpoint = "" where objSearchEndpoint is null'
      ),
      queryInterface.sequelize.query(
        'UPDATE organization SET imageSearchEndpoint = "" where imageSearchEndpoint is null'
      )
    ]
  },
  down: (queryInterface, Sequelize) => {
    return []
  }
}
