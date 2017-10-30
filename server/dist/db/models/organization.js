'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var organization = _connect2.default.define('organization', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV4,
    primaryKey: true
  },
  name: _sequelize2.default.STRING,
  subdomain: {
    type: _sequelize2.default.STRING,
    unique: true
  },
  emailDomain: {
    type: _sequelize2.default.STRING
  },
  newUsersRequireApproval: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  },
  customItemApiEnabled: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  },
  customItemApiEndpoint: {
    type: _sequelize2.default.STRING
  },
  customImageApiEnabled: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  },
  customImageThumbEndpoint: {
    type: _sequelize2.default.STRING
  },
  customImageTileEndpoint: {
    type: _sequelize2.default.STRING
  },
  customImageEndpoint: {
    type: _sequelize2.default.STRING
  },
  customImageInfoEndpoint: {
    type: _sequelize2.default.STRING
  }
}, {
  freezeTableName: true
});

exports.default = organization;