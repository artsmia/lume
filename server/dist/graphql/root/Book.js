'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require('../../db/models/book');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Book = {
  pages: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var id = _ref.id;
      var book;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _book2.default.findById(id);

            case 3:
              book = _context.sent;
              _context.next = 6;
              return book.getPages();

            case 6:
              return _context.abrupt('return', _context.sent);

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

    function pages(_x) {
      return _ref2.apply(this, arguments);
    }

    return pages;
  }(),
  relatedItems: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
      var id = _ref3.id;
      var book;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _book2.default.findById(id);

            case 3:
              book = _context2.sent;
              _context2.next = 6;
              return book.getRelatedItems();

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 9]]);
    }));

    function relatedItems(_x2) {
      return _ref4.apply(this, arguments);
    }

    return relatedItems;
  }(),
  previewImage: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
      var id = _ref5.id;
      var book;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _book2.default.findById(id);

            case 3:
              book = _context3.sent;
              _context3.next = 6;
              return book.getPreviewImage();

            case 6:
              return _context3.abrupt('return', _context3.sent);

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);

              console.error(_context3.t0);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 9]]);
    }));

    function previewImage(_x3) {
      return _ref6.apply(this, arguments);
    }

    return previewImage;
  }()
};

exports.default = Book;