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

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, args, ctx) {
    var mainImageId, comparisonImages, title, text, video, type, index, page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            mainImageId = args.mainImageId, comparisonImages = args.comparisonImages, title = args.title, text = args.text, video = args.video, type = args.type, index = args.index;
            page = void 0;

            if (args.id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return _page2.default.create({
              title: "New Page"
            });

          case 6:
            page = _context.sent;
            _context.next = 15;
            break;

          case 9:
            _context.next = 11;
            return _page2.default.update({
              title: title,
              text: text,
              video: video,
              type: type,
              index: index
            }, {
              where: {
                id: args.id
              }
            });

          case 11:
            page = _context.sent;
            _context.next = 14;
            return _page2.default.findById(args.id);

          case 14:
            page = _context.sent;

          case 15:

            if (comparisonImages) {
              console.log(comparisonImages);
            }

            if (!mainImageId) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return page.setMainPageImage(mainImageId);

          case 19:
            return _context.abrupt('return', page);

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 22]]);
  }));

  function editOrCreatePage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return editOrCreatePage;
}();