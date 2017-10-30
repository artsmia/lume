'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var bulkUpload = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, fileId, bucket) {
    var buffer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return readFile('/' + fileId + '/TileGroup0/' + file);

          case 3:
            buffer = _context2.sent;
            _context2.next = 6;
            return upload({
              Key: fileId + '/tiles/' + file,
              Bucket: bucket,
              Body: buffer,
              ACL: "public-read",
              ContentType: 'image/png'
            });

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            console.error(_context2.t0);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 8]]);
  }));

  return function bulkUpload(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var s3 = new _awsSdk2.default.S3();

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$file, mimetype, buffer, bucket, fileId, _ref2, Buckets, s, m, filePath, files;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$file = req.file, mimetype = _req$file.mimetype, buffer = _req$file.buffer, bucket = req.body.orgId;
            fileId = (0, _v2.default)();
            _context.next = 5;
            return listBuckets();

          case 5:
            _ref2 = _context.sent;
            Buckets = _ref2.Buckets;

            if (Buckets.find(function (item) {
              return item.Name === bucket;
            })) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return createBucket({
              Bucket: bucket,
              ACL: "public-read"
            });

          case 10:
            _context.next = 12;
            return (0, _sharp2.default)(buffer).resize(100).toBuffer();

          case 12:
            s = _context.sent;
            _context.next = 15;
            return (0, _sharp2.default)(buffer).resize(400).toBuffer();

          case 15:
            m = _context.sent;
            _context.next = 18;
            return upload({
              Key: fileId + '/original',
              Bucket: bucket,
              Body: buffer,
              ACL: "public-read",
              ContentType: mimetype
            });

          case 18:
            _context.next = 20;
            return upload({
              Key: fileId + '/s',
              Bucket: bucket,
              Body: s,
              ACL: "public-read",
              ContentType: mimetype
            });

          case 20:
            _context.next = 22;
            return upload({
              Key: fileId + '/m',
              Bucket: bucket,
              Body: m,
              ACL: "public-read",
              ContentType: mimetype
            });

          case 22:
            filePath = '' + __dirname;

            filePath = filePath.split('server/')[1];

            _context.next = 26;
            return (0, _sharp2.default)(buffer).png().tile({ size: 512, layout: 'zoomify' }).toFile(filePath + '/' + fileId);

          case 26:
            _context.next = 28;
            return readDir('/' + fileId + '/TileGroup0');

          case 28:
            files = _context.sent;
            _context.next = 31;
            return Promise.all(files.map(function (file) {
              return bulkUpload(file, fileId, bucket);
            }));

          case 31:
            _context.next = 33;
            return deleteDirectory('/' + fileId);

          case 33:

            req.body = {
              query: 'mutation {\n        editOrCreateImage(\n          id: "' + fileId + '"\n          organizationId: "' + bucket + '"\n        ) {\n          id\n        }\n      }'
            };

            next();

            _context.next = 40;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 37]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function upload(params) {
  return new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function listBuckets() {
  return new Promise(function (resolve, reject) {
    s3.listBuckets(function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function createBucket(params) {
  return new Promise(function (resolve, reject) {
    s3.createBucket(params, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function readFile(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + path, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function readDir(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readdir(__dirname + path, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function deleteDirectory(path) {
  return new Promise(function (resolve, reject) {
    (0, _rimraf2.default)('' + __dirname + path, function (err) {
      console.log(err);
      resolve();
    });
  });
}