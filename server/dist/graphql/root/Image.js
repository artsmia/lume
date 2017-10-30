'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('../../db/models/image');

var _image2 = _interopRequireDefault(_image);

var _pageComparisonImage = require('../../db/models/pageComparisonImage');

var _pageComparisonImage2 = _interopRequireDefault(_pageComparisonImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Image = {
  organization: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(argImage) {
      var image;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _image2.default.findById(argImage.id);

            case 3:
              image = _context.sent;
              _context.next = 6;
              return image.getOrganization();

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

    function organization(_x) {
      return _ref.apply(this, arguments);
    }

    return organization;
  }()
};

exports.default = Image;