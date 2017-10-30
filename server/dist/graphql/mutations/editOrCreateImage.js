'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('../../db/models/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, args, ctx) {
    var id, organizationId, image;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = args.id, organizationId = args.organizationId;
            _context.next = 4;
            return _image2.default.create({
              id: id
            });

          case 4:
            image = _context.sent;
            _context.next = 7;
            return image.setOrganization(organizationId);

          case 7:
            return _context.abrupt('return', image);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  function editOrCreateImage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return editOrCreateImage;
}();