'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _associations = require('./associations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _associations.createAssociations)();
// import populate from './populate'

// createAssociations()
//
// async function createTables() {
//   try {
//
//     await db.sync({force: true})
//
//
//     console.log(chalk.cyan("DB Synced"))
//
//   } catch (ex) {
//     console.error("db sync error", ex)
//
//   }
// }
//
// async function populateData(){
//   try {
//     await populate()
//     console.log(chalk.cyan("DB populated"))
//
//   } catch (ex) {
//     console.error("db population error", ex)
//   }
// }
//
// export async function initalizeDb(){
//   try {
//
//     await createTables()
//     //await populateData()
//
//     console.log(chalk.cyan("DB initialized"))
//
//   } catch (ex) {
//     console.error("db initialization error", ex)
//
//   }
// }


exports.default = _connect2.default;