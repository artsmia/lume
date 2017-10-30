"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var url, options, response, json, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            url = "http://search.artsmia.org/id/" + id;
            options = {
              method: "GET"
            };
            _context.next = 5;
            return (0, _nodeFetch2.default)(url, options);

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            json = _context.sent;
            data = {
              item: _defineProperty({
                accessionNumber: json["accession_number"],
                medium: json.medium,
                title: json.title,
                date: json.dated,
                dimensions: json.dimensions,
                attribution: json.artist,
                culture: json.culture || json.country,
                creditLine: json.creditline,
                currentLocation: json.room
              }, "dimensions", json.dimensions)
            };
            return _context.abrupt("return", data);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            console.error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();