'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _organization = require('../../db/models/organization');

var _organization2 = _interopRequireDefault(_organization);

var _group = require('../../db/models/group');

var _group2 = _interopRequireDefault(_group);

var _userOrganization = require('../../db/models/userOrganization');

var _userOrganization2 = _interopRequireDefault(_userOrganization);

var _management = require('../../auth/management');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Organization = {
  users: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args) {
      var id, userOrgs, _users;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = obj.dataValues.id;
              _context.next = 4;
              return _userOrganization2.default.findAll({
                where: {
                  organizationId: id
                }
              });

            case 4:
              userOrgs = _context.sent;
              _context.next = 7;
              return Promise.all(userOrgs.map(function (_ref2) {
                var userId = _ref2.userId;
                return (0, _management.getUser)(userId);
              }));

            case 7:
              _users = _context.sent;


              _users.forEach(function (user) {
                user.id = user["user_id"];

                var _userOrgs$find = userOrgs.find(function (_ref3) {
                  var dataValues = _ref3.dataValues;
                  return dataValues.userId === user.id;
                }),
                    role = _userOrgs$find.dataValues.role;

                user.role = role;
              });

              return _context.abrupt('return', _users);

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);

              console.error(_context.t0);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 12]]);
    }));

    function users(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return users;
  }(),
  items: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, args) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return obj.getItems();

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              console.error(_context2.t0);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 6]]);
    }));

    function items(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return items;
  }(),
  groups: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj, args) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return obj.getGroups();

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](0);

              console.error(_context3.t0);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 6]]);
    }));

    function groups(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return groups;
  }(),
  books: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(obj, args) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return obj.getBooks();

            case 3:
              return _context4.abrupt('return', _context4.sent);

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4['catch'](0);

              console.error(_context4.t0);

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 6]]);
    }));

    function books(_x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return books;
  }(),
  images: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(obj, args) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return obj.getImages();

            case 3:
              return _context5.abrupt('return', _context5.sent);

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5['catch'](0);

              console.error(_context5.t0);

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 6]]);
    }));

    function images(_x9, _x10) {
      return _ref7.apply(this, arguments);
    }

    return images;
  }()
};

exports.default = Organization;