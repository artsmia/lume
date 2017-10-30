'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detail = require('../../db/models/detail');

var _detail2 = _interopRequireDefault(_detail);

var _item = require('../../db/models/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var id = _ref.id;
    var detail, item;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _detail2.default.findById(id);

          case 3:
            detail = _context.sent;
            _context.next = 6;
            return _item2.default.findById(detail.itemId);

          case 6:
            item = _context.sent;
            _context.next = 9;
            return detail.destroy();

          case 9:
            return _context.abrupt('return', item);

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

  function deleteDetail(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return deleteDetail;
}();