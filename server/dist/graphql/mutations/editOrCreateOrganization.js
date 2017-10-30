'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _organization = require('../../db/models/organization');

var _organization2 = _interopRequireDefault(_organization);

var _userOrganization = require('../../db/models/userOrganization');

var _userOrganization2 = _interopRequireDefault(_userOrganization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(src, args, ctx) {
    var organization, id, name, subdomain, newUserIds, customItemApiEnabled, customItemApiEndpoint, customImageApiEnabled, customImageEndpoint, customImageTileEndpoint, customImageThumbEndpoint, customImageInfoEndpoint, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            organization = void 0;
            id = args.id, name = args.name, subdomain = args.subdomain, newUserIds = args.newUserIds, customItemApiEnabled = args.customItemApiEnabled, customItemApiEndpoint = args.customItemApiEndpoint, customImageApiEnabled = args.customImageApiEnabled, customImageEndpoint = args.customImageEndpoint, customImageTileEndpoint = args.customImageTileEndpoint, customImageThumbEndpoint = args.customImageThumbEndpoint, customImageInfoEndpoint = args.customImageInfoEndpoint;

            if (!id) {
              _context.next = 11;
              break;
            }

            _context.next = 6;
            return _organization2.default.update({
              name: name,
              subdomain: subdomain,
              customItemApiEnabled: customItemApiEnabled,
              customItemApiEndpoint: customItemApiEndpoint,
              customImageApiEnabled: customImageApiEnabled,
              customImageEndpoint: customImageEndpoint,
              customImageTileEndpoint: customImageTileEndpoint,
              customImageThumbEndpoint: customImageThumbEndpoint,
              customImageInfoEndpoint: customImageInfoEndpoint
            }, {
              where: {
                id: id
              }
            });

          case 6:
            _context.next = 8;
            return _organization2.default.findById(id);

          case 8:
            organization = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return _organization2.default.create(_extends({}, args));

          case 13:
            organization = _context.sent;

          case 14:
            if (!newUserIds) {
              _context.next = 23;
              break;
            }

            _context.next = 17;
            return Promise.all(newUserIds.map(function (userId) {
              return _userOrganization2.default.create({
                userId: userId,
                organizationId: organization.id,
                role: organization.newUsersRequireApproval ? "pending" : "contributor"
              });
            }));

          case 17:
            _context.next = 19;
            return _userOrganization2.default.findAll({
              where: {
                organizationId: organization.id
              }
            });

          case 19:
            users = _context.sent;

            if (!(users.length === 1)) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return _userOrganization2.default.update({
              role: "admin"
            }, {
              where: {
                userId: users[0].userId,
                organizationId: organization.id
              }
            });

          case 23:
            return _context.abrupt('return', organization);

          case 26:
            _context.prev = 26;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 26]]);
  }));

  function editOrCreateOrganization(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return editOrCreateOrganization;
}();