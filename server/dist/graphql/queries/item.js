'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _item2 = require('../../db/models/item');

var _item3 = _interopRequireDefault(_item2);

var _organization = require('../../db/models/organization');

var _organization2 = _interopRequireDefault(_organization);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var id = _ref.id;

    var _item, orgs, org, url, options, response, json;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _item3.default.findById(id);

          case 3:
            _item = _context.sent;

            if (!(_item.pullFromCustomApi && _item.localId)) {
              _context.next = 19;
              break;
            }

            _context.next = 7;
            return _item.getOrganizations();

          case 7:
            orgs = _context.sent;
            org = orgs[0];

            if (!(org.customItemApiEnabled && org.customItemApiEndpoint)) {
              _context.next = 19;
              break;
            }

            url = org.customItemApiEndpoint;
            options = {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({
                id: _item.localId
              })
            };
            _context.next = 14;
            return (0, _nodeFetch2.default)(url, options);

          case 14:
            response = _context.sent;
            _context.next = 17;
            return response.json();

          case 17:
            json = _context.sent;

            _item = _extends({}, _item.dataValues, json.item);

          case 19:
            return _context.abrupt('return', _item);

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

  function item(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return item;
}();