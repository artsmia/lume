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
    var id = _ref.id,
        itemId = _ref.itemId,
        title = _ref.title,
        index = _ref.index,
        imageId = _ref.imageId,
        description = _ref.description,
        geometry = _ref.geometry,
        newAdditionalImageIds = _ref.newAdditionalImageIds,
        removeAdditionalImageIds = _ref.removeAdditionalImageIds;
    var detail, item;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            detail = void 0;

            if (id) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return _detail2.default.create({});

          case 5:
            detail = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return _detail2.default.findById(id);

          case 10:
            detail = _context.sent;

          case 11:
            if (!itemId) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return _item2.default.findById(itemId);

          case 14:
            item = _context.sent;
            _context.next = 17;
            return item.addDetail(detail);

          case 17:
            if (!imageId) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return detail.setImage(imageId);

          case 20:
            detail = _context.sent;

          case 21:
            if (!newAdditionalImageIds) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return detail.addAdditionalImages(newAdditionalImageIds);

          case 24:
            if (!removeAdditionalImageIds) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return detail.removeAdditionalImages(removeAdditionalImageIds);

          case 27:
            _context.next = 29;
            return detail.update({
              title: title,
              index: index,
              description: description,
              geometry: geometry
            }, {
              where: {
                id: id
              }
            });

          case 29:
            _context.next = 31;
            return _detail2.default.findById(id);

          case 31:
            detail = _context.sent;
            return _context.abrupt('return', detail);

          case 35:
            _context.prev = 35;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 38:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 35]]);
  }));

  function editOrCreateDetail(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return editOrCreateDetail;
}();