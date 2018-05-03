'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('organization', 'objSearchEndpoint', Sequelize.STRING, {
        defaultValue: false
      }),
      queryInterface.addColumn('organization', 'imageSearchEndpoint', Sequelize.STRING, {
        defaultValue: ''
      }),
    ]

  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('organization', 'objSearchEndpoint', Sequelize.STRING, {
        defaultValue: false
      }),
      queryInterface.removeColumn('organization', 'imageSearchEndpoint', Sequelize.STRING, {
        defaultValue: ''
      }),
    ]

  }
};
