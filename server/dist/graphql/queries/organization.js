'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _organization2 = require('../../db/models/organization');

var _organization3 = _interopRequireDefault(_organization2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var id = _ref.id,
        subdomain = _ref.subdomain;

    var _organization;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _organization = void 0;

            if (!id) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return _organization3.default.findOne({
              where: {
                id: id
              }
            });

          case 5:
            _organization = _context.sent;
            _context.next = 12;
            break;

          case 8:
            if (!subdomain) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return _organization3.default.findOne({
              where: {
                subdomain: subdomain
              }
            });

          case 11:
            _organization = _context.sent;

          case 12:
            return _context.abrupt('return', _organization);

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 15]]);
  }));

  function organization(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return organization;
}();