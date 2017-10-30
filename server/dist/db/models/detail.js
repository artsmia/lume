'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var detail = _connect2.default.define('detail', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV4,
    primaryKey: true
  },
  title: {
    type: _sequelize2.default.STRING
  },
  index: {
    type: _sequelize2.default.INTEGER
  },
  geometry: {
    type: _sequelize2.default.GEOMETRY("POLYGON")
  },
  description: _sequelize2.default.TEXT
}, {
  freezeTableName: true
});

exports.default = detail;