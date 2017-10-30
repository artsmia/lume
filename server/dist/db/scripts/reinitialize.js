'use strict';

var reinitialize = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _associations.createAssociations)();

          case 3:
            _context.next = 5;
            return _connect2.default.query("SET foreign_key_checks = 0;");

          case 5:
            _context.next = 7;
            return _connect2.default.sync({ force: true });

          case 7:
            _context.next = 9;
            return _connect2.default.query("SET foreign_key_checks = 1;");

          case 9:

            console.log("done?");
            process.exit(0);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function reinitialize() {
    return _ref.apply(this, arguments);
  };
}();

require('babel-polyfill');

require('dotenv/config');

var _connect = require('../connect');

var _connect2 = _interopRequireDefault(_connect);

var _associations = require('../associations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

reinitialize();