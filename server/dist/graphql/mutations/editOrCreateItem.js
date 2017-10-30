'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _item = require('../../db/models/item');

var _item2 = _interopRequireDefault(_item);

var _detail = require('../../db/models/detail');

var _detail2 = _interopRequireDefault(_detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, args, ctx) {
    var argItem, newOrganizationIds, mainImageId, newRelatedItemIds, newRelatedBookIds, newGroupIds, _args$createAndAddDet, createAndAddDetailItemId, imageId, removeRelatedBookIds, item, details;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            argItem = args.item, newOrganizationIds = args.newOrganizationIds, mainImageId = args.mainImageId, newRelatedItemIds = args.newRelatedItemIds, newRelatedBookIds = args.newRelatedBookIds, newGroupIds = args.newGroupIds, _args$createAndAddDet = args.createAndAddDetail, createAndAddDetailItemId = _args$createAndAddDet.itemId, imageId = _args$createAndAddDet.imageId, removeRelatedBookIds = args.removeRelatedBookIds;
            item = void 0;

            if (argItem.id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return _item2.default.create(_extends({}, argItem, {
              title: "New Item"
            }));

          case 6:
            item = _context.sent;
            _context.next = 15;
            break;

          case 9:
            _context.next = 11;
            return _item2.default.update(argItem, {
              where: {
                id: argItem.id
              }
            });

          case 11:
            item = _context.sent;
            _context.next = 14;
            return _item2.default.findById(argItem.id);

          case 14:
            item = _context.sent;

          case 15:
            if (!newOrganizationIds) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return item.addOrganizations(newOrganizationIds);

          case 18:
            if (!mainImageId) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return item.setMainImage(mainImageId);

          case 21:
            if (!newRelatedItemIds) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return item.addRelatedItems(newRelatedItemIds);

          case 24:
            if (!newRelatedBookIds) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return item.addRelatedBooks(newRelatedBookIds);

          case 27:
            if (!removeRelatedBookIds) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return item.removeRelatedBooks(removeRelatedBookIds);

          case 30:
            if (!newGroupIds) {
              _context.next = 33;
              break;
            }

            _context.next = 33;
            return item.addGroups(newRelatedGroupIds);

          case 33:
            if (!createAndAddDetailItemId) {
              _context.next = 42;
              break;
            }

            _context.next = 36;
            return item.getDetails();

          case 36:
            details = _context.sent;
            _context.next = 39;
            return _detail2.default.create({
              itemId: createAndAddDetailItemId,
              imageId: imageId,
              index: details.length
            });

          case 39:
            _context.next = 41;
            return _item2.default.findById(argItem.id);

          case 41:
            item = _context.sent;

          case 42:
            return _context.abrupt('return', item);

          case 45:
            _context.prev = 45;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 48:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 45]]);
  }));

  function editOrCreateItem(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return editOrCreateItem;
}();