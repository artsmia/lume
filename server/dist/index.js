'use strict';

require('babel-polyfill');

require('dotenv/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _graphql = require('./graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _auth = require('./auth');

var _apolloServerExpress = require('apollo-server-express');

var _iiif = require('./iiif');

var _iiif2 = _interopRequireDefault(_iiif);

var _customItemEndpoints = require('./customItemEndpoints');

var _customItemEndpoints2 = _interopRequireDefault(_customItemEndpoints);

var _gdrive = require('./gdrive');

var _gdrive2 = _interopRequireDefault(_gdrive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)();

var server = (0, _express2.default)();

var port = process.env.PORT || 5000;

server.set('port', port);

server.use((0, _cors2.default)(), _bodyParser2.default.json(), _auth.authMiddleware);

server.use('/gdrive', upload.single("file"), _gdrive2.default);

server.use('/item/:orgSub', _customItemEndpoints2.default);

server.use("/image", upload.single("file"), _images2.default);

server.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: '/'
}));

server.use('/iiif/:identifier/info.json', _iiif.info);

server.use('/iiif/:identifier/:region/:size/:rotation/:quality.:format', _iiif2.default);

server.use('/', (0, _apolloServerExpress.graphqlExpress)(function (req, res) {
  return {
    schema: _graphql2.default,
    context: req
  };
}));

server.listen(server.get('port'), function () {
  console.log('Server is running at port ' + server.get('port'));
});

// const {
//   initDb
// } = process.env
//
// if (initDb === "true") {
//   initalizeDb()
// }