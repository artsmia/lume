'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _management = require('../../auth/management');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var id = _ref.id;

    var userId, _user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = id ? id : ctx.userId;
            _context.next = 4;
            return (0, _management.getUser)(userId);

          case 4:
            _user = _context.sent;


            if (!_user.id) {
              _user.id = userId;
            }

            return _context.abrupt('return', _user);

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  function user(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return user;
}();