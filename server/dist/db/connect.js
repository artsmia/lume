"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = void 0;
var port = void 0;
var username = void 0;
var password = void 0;
var database = void 0;
var dialect = void 0;

switch (process.env.NODE_ENV) {
  case "dev":
    {
      host = process.env.devDb_host;
      port = process.env.devDb_port;
      username = process.env.devDb_username;
      password = process.env.devDb_password;
      database = process.env.devDb_database;
      dialect = process.env.devDb_dialect;
      break;
    }
  case "production":
    {
      host = process.env.betaDb_host;
      port = process.env.betaDb_port;
      username = process.env.betaDb_username;
      password = process.env.betaDb_password;
      database = process.env.betaDb_database;
      dialect = process.env.betaDb_dialect;
      break;
    }
  default:
    {

      break;
    }
}

var db = new _sequelize2.default({
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  dialect: dialect
});

exports.default = db;