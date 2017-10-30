'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = _connect2.default.define('image', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV4,
    primaryKey: true
  },
  title: _sequelize2.default.STRING,
  alt: _sequelize2.default.STRING,
  localId: _sequelize2.default.STRING,
  metadata: {
    type: _sequelize2.default.STRING
  },
  host: {
    type: _sequelize2.default.ENUM,
    values: ['s3', 'gdrive']
  },
  s3Bucket: _sequelize2.default.STRING,
  gdriveId: _sequelize2.default.STRING
}, {
  freezeTableName: true
});

exports.default = image;