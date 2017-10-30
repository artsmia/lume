'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userOrganization = _connect2.default.define("user_organization", {
  userId: {
    type: _sequelize2.default.STRING
  },
  organizationId: {
    type: _sequelize2.default.UUID,
    references: {
      model: "organization",
      key: "id"
    }
  },
  role: {
    type: _sequelize2.default.ENUM,
    values: ['admin', 'editor', 'contributor', 'pending']
  }
}, {
  freezeTableName: true
});

exports.default = userOrganization;