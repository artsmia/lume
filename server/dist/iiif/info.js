'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _image = require('../db/models/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var imageId, _ref2, organizationId, response, buffer, meta, info;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            imageId = req.params.identifier;
            _context.next = 4;
            return _image2.default.findById(imageId);

          case 4:
            _ref2 = _context.sent;
            organizationId = _ref2.organizationId;
            _context.next = 8;
            return (0, _nodeFetch2.default)('https://s3.amazonaws.com/' + organizationId + '/' + imageId + '/original', {
              method: 'GET'
            });

          case 8:
            response = _context.sent;
            _context.next = 11;
            return response.buffer();

          case 11:
            buffer = _context.sent;
            _context.next = 14;
            return (0, _sharp2.default)(buffer).metadata();

          case 14:
            meta = _context.sent;
            info = {
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": 'http://localhost:3000/iiif/' + imageId,
              "protocal": "http://iiif.io/api/image",
              width: meta.width,
              height: meta.height,
              profile: ["http://iiif.io/api/image/2/level2.json"]
            };

            res.send(info);

            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 19]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();