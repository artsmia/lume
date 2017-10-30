'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var book = _connect2.default.define('book', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV4,
    primaryKey: true
  },
  title: {
    type: _sequelize2.default.STRING,
    defaultValue: "New Book"
  },
  visibility: {
    type: _sequelize2.default.ENUM,
    values: ['published', 'draft']
  }
}, {
  freezeTableName: true
});

exports.default = book;