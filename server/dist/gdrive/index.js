'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var driveSearch = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function (resolve, reject) {
              drive.files.list(options, function (err, response) {
                if (err) reject(err);
                resolve(response);
              });
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function driveSearch(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var driveCreate = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new Promise(function (resolve, reject) {
              drive.files.create(options, function (err, response) {
                if (err) reject(err);
                resolve(response);
              });
            }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function driveCreate(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var drivePermissions = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new Promise(function (resolve, reject) {
              drive.permissions.create(options, function (err, response) {
                if (err) reject(err);
                resolve(response);
              });
            }));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function drivePermissions(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var mkdir = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(path) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', new Promise(function (resolve, reject) {
              _fs2.default.mkdir(path, function () {
                return resolve();
              });
            }));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function mkdir(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

var rename = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(oldpath, newpath) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', new Promise(function (resolve, reject) {
              _fs2.default.rename(oldpath, newpath, function () {
                return resolve();
              });
            }));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function rename(_x8, _x9) {
    return _ref9.apply(this, arguments);
  };
}();

var readdir = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(path) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', new Promise(function (resolve, reject) {
              _fs2.default.readdir(path, function (err, data) {
                if (err) reject(err);
                resolve(data);
              });
            }));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function readdir(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

var readFile = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(path) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', new Promise(function (resolve, reject) {
              _fs2.default.readFile(path, function (err, data) {
                if (err) reject(err);
                resolve(data);
              });
            }));

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function readFile(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

var uploadDirectoryToDrive = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(path, rootParentId) {
    var _this = this;

    var r, _ref13, parentId, files, items, toRead, _loop, _file, body;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            r = /\/([\w-]*$)/g;
            _context10.next = 4;
            return driveCreate({
              resource: {
                name: r.exec(path)[1],
                mimeType: gDirectory,
                parents: [rootParentId]
              }
            });

          case 4:
            _ref13 = _context10.sent;
            parentId = _ref13.id;
            files = [];
            _context10.next = 9;
            return readdir(path);

          case 9:
            items = _context10.sent;
            toRead = items.map(function (file) {
              return {
                name: file,
                path: path + '/' + file,
                parents: [parentId]
              };
            });
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var file, r, isFile, _ref14, id, _items;

              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      file = toRead.shift();
                      r = /\./g;
                      isFile = r.test(file.name);

                      if (!isFile) {
                        _context9.next = 7;
                        break;
                      }

                      files.push(file);

                      _context9.next = 16;
                      break;

                    case 7:
                      _context9.next = 9;
                      return driveCreate({
                        resource: {
                          name: file.name,
                          parents: file.parents,
                          mimeType: gDirectory
                        }
                      });

                    case 9:
                      _ref14 = _context9.sent;
                      id = _ref14.id;


                      console.log('created ' + file.name + ' to gdrive');

                      _context9.next = 14;
                      return readdir(file.path);

                    case 14:
                      _items = _context9.sent;


                      toRead = toRead.concat(_items.map(function (item) {
                        return {
                          name: item,
                          path: file.path + '/' + item,
                          parents: [id]
                        };
                      }));

                    case 16:
                    case 'end':
                      return _context9.stop();
                  }
                }
              }, _callee9, _this);
            });

          case 12:
            if (!(toRead.length > 0)) {
              _context10.next = 16;
              break;
            }

            return _context10.delegateYield(_loop(), 't0', 14);

          case 14:
            _context10.next = 12;
            break;

          case 16:
            if (!(files.length > 0)) {
              _context10.next = 26;
              break;
            }

            _file = files.shift();
            _context10.next = 20;
            return readFile(_file.path);

          case 20:
            body = _context10.sent;
            _context10.next = 23;
            return driveCreate({
              resource: {
                name: _file.name,
                parents: _file.parents
              },
              media: {
                body: body
              }
            });

          case 23:

            console.log('created ' + _file.name + ' to gdrive');

            _context10.next = 16;
            break;

          case 26:
            return _context10.abrupt('return', parentId);

          case 29:
            _context10.prev = 29;
            _context10.t1 = _context10['catch'](0);

            console.error(_context10.t1);

          case 32:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[0, 29]]);
  }));

  return function uploadDirectoryToDrive(_x12, _x13) {
    return _ref12.apply(this, arguments);
  };
}();

var _googleapis = require('googleapis');

var _googleapis2 = _interopRequireDefault(_googleapis);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _management = require('../auth/management');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _image = require('../db/models/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _process$env = process.env,
    gdriveClientID = _process$env.gdriveClientID,
    gdriveClientSecret = _process$env.gdriveClientSecret,
    gdriveApiKey = _process$env.gdriveApiKey;


var OAuth2 = _googleapis2.default.auth.OAuth2;

var gDirectory = 'application/vnd.google-apps.folder';

var auth = new OAuth2(gdriveClientID, gdriveClientSecret, "http://localhost:5000/gdrive");

var drive = _googleapis2.default.drive({
  version: 'v3'
});

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, userId, title, alt, orgId, file, _ref2, identities, _identities$find, access_token, _ref3, files, knightDirectoryId, _ref4, id, newImageId, directory, gdriveId, newImage;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;


            res.send({ status: "Image Received" });

            console.log(req.body);

            _req$body = req.body, userId = _req$body.userId, title = _req$body.title, alt = _req$body.alt, orgId = _req$body.orgId, file = req.file;
            _context.next = 6;
            return (0, _management.getUser)(userId);

          case 6:
            _ref2 = _context.sent;
            identities = _ref2.identities;
            _identities$find = identities.find(function (identity) {
              return identity.provider === 'google-oauth2';
            }), access_token = _identities$find.access_token;


            auth.setCredentials({
              access_token: access_token
            });

            _googleapis2.default.options({ auth: auth });

            console.log("looking for directory");

            _context.next = 14;
            return driveSearch({
              q: 'mimeType=\'' + gDirectory + '\' and name=\'Knight Images\' and appProperties has {key=\'knight\' and value=\'true\'}',
              fields: 'files(id, name, appProperties, permissions)'
            });

          case 14:
            _ref3 = _context.sent;
            files = _ref3.files;
            knightDirectoryId = void 0;

            if (!(files.length < 1)) {
              _context.next = 27;
              break;
            }

            _context.next = 20;
            return driveCreate({
              resource: {
                name: 'Knight Images',
                mimeType: gDirectory,
                appProperties: {
                  knight: true
                }
              }
            });

          case 20:
            _ref4 = _context.sent;
            id = _ref4.id;
            _context.next = 24;
            return drivePermissions({
              resource: {
                type: 'anyone',
                role: 'reader'
              },
              fileId: id
            });

          case 24:

            knightDirectoryId = id;

            _context.next = 28;
            break;

          case 27:
            knightDirectoryId = files[0].id;

          case 28:
            newImageId = (0, _v2.default)();
            directory = __dirname + '/' + newImageId;
            _context.next = 32;
            return mkdir(directory);

          case 32:
            _context.next = 34;
            return (0, _sharp2.default)(file.buffer).png().tile({ size: 512, layout: 'zoomify' }).toFile(directory);

          case 34:

            console.log("creating tiles...");

            _context.next = 37;
            return rename(directory + '/TileGroup0', directory + '/tiles');

          case 37:
            _context.next = 39;
            return (0, _sharp2.default)(file.buffer).toFile(directory + '/original.' + file.mimetype.split('/')[1]);

          case 39:
            _context.next = 41;
            return (0, _sharp2.default)(file.buffer).resize(200).toFile(directory + '/s.png');

          case 41:
            _context.next = 43;
            return (0, _sharp2.default)(file.buffer).resize(400).toFile(directory + '/m.png');

          case 43:

            console.log("uploading files to gdrive");

            _context.next = 46;
            return uploadDirectoryToDrive(directory, knightDirectoryId);

          case 46:
            gdriveId = _context.sent;


            console.log("cleaning up directories");

            _context.next = 50;
            return deleteDirectory(directory);

          case 50:

            console.log("adding new image to database");

            _context.next = 53;
            return _image2.default.create({
              title: title,
              alt: alt,
              host: 'gdrive',
              gdriveId: gdriveId
            });

          case 53:
            newImage = _context.sent;
            _context.next = 56;
            return newImage.setOrganization(orgId);

          case 56:

            console.log("done");

            _context.next = 62;
            break;

          case 59:
            _context.prev = 59;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 62:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 59]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function deleteDirectory(path) {
  return new Promise(function (resolve, reject) {
    (0, _rimraf2.default)(path, function (err) {
      if (err) console.log(err);
      resolve();
    });
  });
}