'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageComparisonImage = _connect2.default.define("page_comparisonImage", {
  index: {
    type: _sequelize2.default.INTEGER
  }
}, {
  freezeTableName: true
});

exports.default = pageComparisonImage;