'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _page = require('../../db/models/page');

var _page2 = _interopRequireDefault(_page);

var _pageComparisonImage = require('../../db/models/pageComparisonImage');

var _pageComparisonImage2 = _interopRequireDefault(_pageComparisonImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Page = {
  comparisonImages: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(page) {
      var _comparisonImages;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _pageComparisonImage2.default.findAll({
                where: {
                  pageId: page.id
                }
              });

            case 3:
              _comparisonImages = _context.sent;
              return _context.abrupt('return', _comparisonImages);

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              console.error(_context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    function comparisonImages(_x) {
      return _ref.apply(this, arguments);
    }

    return comparisonImages;
  }(),
  mainImage: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
      var id = _ref2.id;

      var page, _mainImage;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _page2.default.findById(id);

            case 3:
              page = _context2.sent;
              _context2.next = 6;
              return page.getMainPageImage();

            case 6:
              _mainImage = _context2.sent;
              return _context2.abrupt('return', _mainImage);

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 10]]);
    }));

    function mainImage(_x2) {
      return _ref3.apply(this, arguments);
    }

    return mainImage;
  }()
};

exports.default = Page;