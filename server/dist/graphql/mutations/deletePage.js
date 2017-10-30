'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _page = require('../../db/models/page');

var _page2 = _interopRequireDefault(_page);

var _book = require('../../db/models/book');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var id = _ref.id;
    var deletedPage, book, pages, pagesToUpdate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _page2.default.findById(id);

          case 3:
            deletedPage = _context.sent;
            _context.next = 6;
            return _book2.default.findById(deletedPage.bookId);

          case 6:
            book = _context.sent;
            _context.next = 9;
            return book.getPages();

          case 9:
            pages = _context.sent;
            pagesToUpdate = pages.filter(function (_ref3) {
              var index = _ref3.index;
              return index > deletedPage.index;
            });
            _context.next = 13;
            return Promise.all(pagesToUpdate.map(function (page) {
              return page.update({ index: page.index - 1 });
            }));

          case 13:
            _context.next = 15;
            return deletedPage.destroy();

          case 15:
            return _context.abrupt('return', book);

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  }));

  function deletePage(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return deletePage;
}();