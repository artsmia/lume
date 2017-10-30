'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

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
    var _req$params, imageId, region, size, rotation, quality, format, _ref2, organizationId, response, buffer, image, meta, shorterSide, _region$split, _region$split2, values, _values$split$map, _values$split$map2, left, top, width, height, _region$split$map, _region$split$map2, _left, _top, _width, _height, _exec$map, _exec$map2, w, h, _exec, _exec2, _w, _exec3, _exec4, _h, _exec5, _exec6, n, _w2, _exec7, _exec8, angle, _angle, final;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;


            console.log("why here");

            _req$params = req.params, imageId = _req$params.identifier, region = _req$params.region, size = _req$params.size, rotation = _req$params.rotation, quality = _req$params.quality, format = _req$params.format;
            _context.next = 5;
            return _image2.default.findById(imageId);

          case 5:
            _ref2 = _context.sent;
            organizationId = _ref2.organizationId;
            _context.next = 9;
            return (0, _nodeFetch2.default)('https://s3.amazonaws.com/' + organizationId + '/' + imageId + '/original', {
              method: 'GET'
            });

          case 9:
            response = _context.sent;
            _context.next = 12;
            return response.buffer();

          case 12:
            buffer = _context.sent;
            image = (0, _sharp2.default)(buffer);
            _context.next = 16;
            return image.metadata();

          case 16:
            meta = _context.sent;
            _context.t0 = true;
            _context.next = _context.t0 === (region === "full") ? 20 : _context.t0 === (region === "square") ? 21 : _context.t0 === new RegExp(/pct:.+,.+,.+,/g).test(region) ? 26 : _context.t0 === new RegExp(/.+,.+,.+,/g).test(region) ? 36 : 41;
            break;

          case 20:
            return _context.abrupt('break', 41);

          case 21:
            shorterSide = meta.width > meta.height ? meta.height : meta.width;
            _context.next = 24;
            return image.resize(shorterSide, shorterSide);

          case 24:
            image = _context.sent;
            return _context.abrupt('break', 41);

          case 26:
            _region$split = region.split("pct:"), _region$split2 = _slicedToArray(_region$split, 2), values = _region$split2[1];
            _values$split$map = values.split(",").map(function (region) {
              return parseInt(region, 10) * .01;
            }), _values$split$map2 = _slicedToArray(_values$split$map, 4), left = _values$split$map2[0], top = _values$split$map2[1], width = _values$split$map2[2], height = _values$split$map2[3];


            left = Math.floor(left * meta.width);
            top = Math.floor(top * meta.height);
            width = Math.floor(width * meta.width);
            height = Math.floor(height * meta.height);

            _context.next = 34;
            return image.extract({
              left: left,
              top: top,
              width: width,
              height: height
            });

          case 34:
            image = _context.sent;
            return _context.abrupt('break', 41);

          case 36:
            _region$split$map = region.split(",").map(function (region) {
              return parseInt(region, 10);
            }), _region$split$map2 = _slicedToArray(_region$split$map, 4), _left = _region$split$map2[0], _top = _region$split$map2[1], _width = _region$split$map2[2], _height = _region$split$map2[3];
            _context.next = 39;
            return image.extract({
              left: _left,
              top: _top,
              width: _width,
              height: _height
            });

          case 39:
            image = _context.sent;
            return _context.abrupt('break', 41);

          case 41:
            _context.t1 = true;
            _context.next = _context.t1 === (size === "full") ? 44 : _context.t1 === (size === "max") ? 44 : _context.t1 === new RegExp(/\d+,\d+/g).test(size) ? 45 : _context.t1 === new RegExp(/\d+,/g).test(size) ? 50 : _context.t1 === new RegExp(/,\d+/g).test(size) ? 56 : _context.t1 === new RegExp(/pct:.+/g).test(size) ? 62 : 69;
            break;

          case 44:
            return _context.abrupt('break', 69);

          case 45:
            _exec$map = new RegExp(/(\d+),(\d+)/g).exec(size).map(function (value) {
              return Math.floor(parseInt(value, 10));
            }), _exec$map2 = _slicedToArray(_exec$map, 3), w = _exec$map2[1], h = _exec$map2[2];
            _context.next = 48;
            return image.resize(w, h).ignoreAspectRatio();

          case 48:
            image = _context.sent;
            return _context.abrupt('break', 69);

          case 50:
            _exec = new RegExp(/(\d+),/g).exec(size), _exec2 = _slicedToArray(_exec, 2), _w = _exec2[1];


            _w = parseInt(_w, 10);

            _context.next = 54;
            return image.resize(_w, null);

          case 54:
            image = _context.sent;
            return _context.abrupt('break', 69);

          case 56:
            _exec3 = new RegExp(/,(\d+)/g).exec(size), _exec4 = _slicedToArray(_exec3, 2), _h = _exec4[1];


            _h = parseInt(_h, 10);

            _context.next = 60;
            return image.resize(null, _h);

          case 60:
            image = _context.sent;
            return _context.abrupt('break', 69);

          case 62:
            _exec5 = new RegExp(/pct:(.+)/g).exec(size), _exec6 = _slicedToArray(_exec5, 2), n = _exec6[1];


            n = parseInt(n, 10) / 100;

            _w2 = Math.floor(meta.width * n);
            _context.next = 67;
            return image.resize(_w2);

          case 67:
            image = _context.sent;
            return _context.abrupt('break', 69);

          case 69:
            _context.t2 = true;
            _context.next = _context.t2 === rotation.includes('!') ? 72 : 81;
            break;

          case 72:
            _context.next = 74;
            return image.flip();

          case 74:
            image = _context.sent;
            _exec7 = new RegExp(/\!(\d+)/g).exec(rotation), _exec8 = _slicedToArray(_exec7, 2), angle = _exec8[1];

            angle = parseInt(angle, 10);
            _context.next = 79;
            return image.rotate(angle);

          case 79:
            image = _context.sent;
            return _context.abrupt('break', 86);

          case 81:
            _angle = parseInt(rotation, 10);
            _context.next = 84;
            return image.rotate(_angle);

          case 84:
            image = _context.sent;
            return _context.abrupt('break', 86);

          case 86:
            _context.t3 = true;
            _context.next = _context.t3 === (quality === 'color') ? 89 : _context.t3 === (quality === 'gray') ? 90 : 94;
            break;

          case 89:
            return _context.abrupt('break', 95);

          case 90:
            _context.next = 92;
            return image.grayscale();

          case 92:
            image = _context.sent;
            return _context.abrupt('break', 95);

          case 94:
            return _context.abrupt('break', 95);

          case 95:
            _context.t4 = true;
            _context.next = _context.t4 === (format === "jpg") ? 98 : _context.t4 === (format === "tif") ? 103 : _context.t4 === (format === "png") ? 108 : 108;
            break;

          case 98:
            _context.next = 100;
            return image.jpeg();

          case 100:
            image = _context.sent;

            res.type('jpeg');
            return _context.abrupt('break', 113);

          case 103:
            _context.next = 105;
            return image.tiff();

          case 105:
            image = _context.sent;

            res.type('tif');
            return _context.abrupt('break', 113);

          case 108:
            _context.next = 110;
            return image.png();

          case 110:
            image = _context.sent;

            res.type("png");
            return _context.abrupt('break', 113);

          case 113:
            _context.next = 115;
            return image.toBuffer("yourFile");

          case 115:
            final = _context.sent;


            res.send(final);

            _context.next = 124;
            break;

          case 119:
            _context.prev = 119;
            _context.t5 = _context['catch'](0);

            console.error(_context.t5);
            res.status(400);
            res.send("Bad Request");

          case 124:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 119]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.info = _info2.default;