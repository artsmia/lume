'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require('../../db/models/book');

var _book2 = _interopRequireDefault(_book);

var _page = require('../../db/models/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, args, ctx) {
    var newOrganizationIds, createAndAddPage, previewImageId, book, bookId, pages;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            newOrganizationIds = args.newOrganizationIds, createAndAddPage = args.createAndAddPage, previewImageId = args.previewImageId;
            book = void 0;

            if (args.id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return _book2.default.create({
              title: "New Book"
            });

          case 6:
            book = _context.sent;
            _context.next = 15;
            break;

          case 9:
            _context.next = 11;
            return _book2.default.update(args, {
              where: {
                id: args.id
              }
            });

          case 11:
            book = _context.sent;
            _context.next = 14;
            return _book2.default.findById(args.id);

          case 14:
            book = _context.sent;

          case 15:
            if (!newOrganizationIds) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return book.addOrganizations(newOrganizationIds);

          case 18:
            if (!createAndAddPage) {
              _context.next = 25;
              break;
            }

            bookId = createAndAddPage.bookId;
            _context.next = 22;
            return book.getPages();

          case 22:
            pages = _context.sent;
            _context.next = 25;
            return _page2.default.create({
              bookId: bookId,
              index: pages.length,
              type: 'image'
            });

          case 25:
            if (!previewImageId) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return book.setPreviewImage(previewImageId);

          case 28:
            return _context.abrupt('return', book);

          case 31:
            _context.prev = 31;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 34:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 31]]);
  }));

  function editOrCreateBook(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return editOrCreateBook;
}();