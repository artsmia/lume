'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.refreshToken = undefined;

var refreshToken = exports.refreshToken = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var options, response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            options = {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: '3hrqWKRLV1E85m1EgQ1IiKSImi6JBEvi',
                client_secret: process.env.auth0ManagmentSecret,
                audience: managementEndpoint + '/'
              })
            };
            _context.next = 4;
            return (0, _isomorphicUnfetch2.default)('https://artsmia.auth0.com/oauth/token', options);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            json = _context.sent;


            expiration = json["expires_in"] * 1000 + Date.now();
            managementToken = json["access_token"];

            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function refreshToken() {
    return _ref.apply(this, arguments);
  };
}();

var getUser = exports.getUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var options, response, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!managementToken || Date.now() > expiration)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 4;
            return refreshToken();

          case 4:
            options = {
              method: 'GET',
              headers: {
                "Authorization": 'Bearer ' + managementToken
              }
            };
            _context2.next = 7;
            return (0, _isomorphicUnfetch2.default)(managementEndpoint + '/users/' + id, options);

          case 7:
            response = _context2.sent;
            _context2.next = 10;
            return response.json();

          case 10:
            json = _context2.sent;
            return _context2.abrupt('return', json);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](0);

            console.log("getUser ex", _context2.t0);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 14]]);
  }));

  return function getUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// export async function getUserGoogleTokens(userId){
//   try {
//     if (
//       !managementToken ||
//       Date.now() > expiration
//     ) {
//       await refreshToken()
//     }
//
//     const options =  {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${managementToken}`
//       }
//     }
//
//
//     const response = await fetch(`${managementEndpoint}/users/${userId}`, options)
//
//     const json = await response.json()
//
//     console.log(json)
//
//     return json
//
//   } catch (ex) {
//     console.error(ex)
//   }
// }


var _isomorphicUnfetch = require('isomorphic-unfetch');

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var managementEndpoint = "https://artsmia.auth0.com/api/v2";

var managementToken = void 0;
var expiration = void 0;