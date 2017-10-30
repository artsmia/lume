'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = undefined;

var authMiddleware = exports.authMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var IDToken, decoded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!req.headers.authorization) {
              _context.next = 7;
              break;
            }

            IDToken = req.headers.authorization.split('Bearer ')[1];
            _context.next = 5;
            return verify(IDToken);

          case 5:
            decoded = _context.sent;

            req.userId = decoded.sub;

          case 7:
            next();
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.error("authMiddleware ex", _context.t0);
            next();

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function verify(IDToken) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.verify(IDToken, process.env.auth0Secret, {
      algorithms: ["HS256"]
    }, function (ex, decoded) {
      if (ex) {
        reject(ex);
      }
      resolve(decoded);
    });
  });
}