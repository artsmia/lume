'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var item = _connect2.default.define('item', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV4,
    primaryKey: true
  },
  localId: {
    type: _sequelize2.default.STRING
  },
  title: {
    type: _sequelize2.default.STRING,
    defaultValue: "New Item"
  },
  attribution: _sequelize2.default.STRING,
  date: _sequelize2.default.STRING,
  culture: _sequelize2.default.STRING,
  accessionNumber: _sequelize2.default.STRING,
  medium: _sequelize2.default.STRING,
  dimensions: _sequelize2.default.STRING,
  currentLocation: _sequelize2.default.STRING,
  creditLine: _sequelize2.default.TEXT,
  text: _sequelize2.default.TEXT,
  visibility: {
    type: _sequelize2.default.ENUM,
    values: ['published', 'draft']
  },
  pullFromCustomApi: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
});

exports.default = item;