'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('organization', 'customAnalyticsEnabled', Sequelize.BOOLEAN, {
        defaultValue: false
      }),
      queryInterface.addColumn('organization', 'customAnalyticsId', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.addColumn('organization', 'imageId', Sequelize.UUID, {
        references: {
          model: 'image',
          key: 'id'
        }
      }),
      queryInterface.sequelize.query('UPDATE organization SET customAnalyticsEnabled = false where customAnalyticsEnabled is null'),
      queryInterface.sequelize.query('UPDATE organization SET customAnalyticsId = "" where customAnalyticsId is null')
    ]

  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('organization', 'customAnalyticsEnabled', Sequelize.BOOLEAN, {
        defaultValue: false
      }),
      queryInterface.removeColumn('organization', 'customAnalyticsId', Sequelize.STRING, {
        defaultValue: ''
      }),
      queryInterface.removeColumn('organization', 'imageId', Sequelize.UUID, {
        references: {
          model: 'image',
          key: 'id'
        }
      })
    ]

  }
};
