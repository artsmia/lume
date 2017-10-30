"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mia = require("./mia");

var _mia2 = _interopRequireDefault(_mia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = void 0;
            _context.t0 = req.params.orgSub;
            _context.next = _context.t0 === "mia" ? 5 : 9;
            break;

          case 5:
            _context.next = 7;
            return (0, _mia2.default)(req.body.id);

          case 7:
            data = _context.sent;
            return _context.abrupt("break", 10);

          case 9:
            return _context.abrupt("break", 10);

          case 10:

            res.send(data);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](0);

            console.error(_context.t1);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();