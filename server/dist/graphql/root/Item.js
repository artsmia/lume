'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = require('../../db/models/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Item = {
  organizations: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context.sent;
              _context.next = 6;
              return item.getOrganizations();

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

    function organizations(_x) {
      return _ref.apply(this, arguments);
    }

    return organizations;
  }(),
  relatedItems: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context2.sent;
              _context2.next = 6;
              return item.getRelatedItems();

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
      return _ref2.apply(this, arguments);
    }

    return relatedItems;
  }(),
  relatedBooks: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context3.sent;
              _context3.next = 6;
              return item.getRelatedBooks();

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

    function relatedBooks(_x3) {
      return _ref3.apply(this, arguments);
    }

    return relatedBooks;
  }(),
  groups: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context4.sent;
              _context4.next = 6;
              return item.getGroups();

            case 6:
              return _context4.abrupt('return', _context4.sent);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4['catch'](0);

              console.error(_context4.t0);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 9]]);
    }));

    function groups(_x4) {
      return _ref4.apply(this, arguments);
    }

    return groups;
  }(),
  details: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context5.sent;
              _context5.next = 6;
              return item.getDetails();

            case 6:
              return _context5.abrupt('return', _context5.sent);

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5['catch'](0);

              console.error(_context5.t0);

            case 12:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 9]]);
    }));

    function details(_x5) {
      return _ref5.apply(this, arguments);
    }

    return details;
  }(),
  mainImage: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(argItem) {
      var item;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _item2.default.findById(argItem.id);

            case 3:
              item = _context6.sent;
              _context6.next = 6;
              return item.getMainImage();

            case 6:
              return _context6.abrupt('return', _context6.sent);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6['catch'](0);

              console.error(_context6.t0);

            case 12:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 9]]);
    }));

    function mainImage(_x6) {
      return _ref6.apply(this, arguments);
    }

    return mainImage;
  }()
};

exports.default = Item;