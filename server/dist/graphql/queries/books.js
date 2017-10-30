'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require('../../db/models/book');

var _book2 = _interopRequireDefault(_book);

var _organization = require('../../db/models/organization');

var _organization2 = _interopRequireDefault(_organization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, _ref, ctx) {
    var organizationId = _ref.organizationId,
        orgSub = _ref.orgSub,
        search = _ref.search;
    var options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            options = [];


            if (search) {
              options.push({
                where: {
                  title: {
                    $regexp: search
                  }
                }
              });
            }

            if (organizationId) {
              options.push({
                include: [{
                  model: _organization2.default,
                  as: "organizations",
                  where: {
                    id: organizationId
                  }
                }]
              });
            }

            if (orgSub) {
              options.push({
                include: [{
                  model: _organization2.default,
                  as: "organizations",
                  where: {
                    subdomain: orgSub
                  }
                }]
              });
            }

            _context.next = 7;
            return _book2.default.findAll.apply(_book2.default, options);

          case 7:
            return _context.abrupt('return', _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  function books(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  }

  return books;
}();