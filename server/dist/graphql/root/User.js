'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userOrganization = require('../../db/models/userOrganization');

var _userOrganization2 = _interopRequireDefault(_userOrganization);

var _organization = require('../../db/models/organization');

var _organization2 = _interopRequireDefault(_organization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
  organizations: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
      var userOrgs, orgIds, _organizations;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userOrganization2.default.findAll({
                where: {
                  userId: user.id
                }
              });

            case 3:
              userOrgs = _context.sent;
              orgIds = userOrgs.map(function (_ref2) {
                var organizationId = _ref2.organizationId;
                return organizationId;
              });
              _organizations = _organization2.default.findAll({
                where: {
                  $or: [{
                    id: orgIds
                  }]
                }
              });
              return _context.abrupt('return', _organizations);

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
  }()
};

exports.default = User;