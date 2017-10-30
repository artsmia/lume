'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _typeDefs = require('./typeDefs');

var _typeDefs2 = _interopRequireDefault(_typeDefs);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _typeDefs2.default,
  resolvers: _resolvers2.default
});
exports.default = schema;