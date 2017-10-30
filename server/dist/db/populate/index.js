'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createDetailAndClips = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(oldItem) {
    var item, detail, newClips, clips;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _item2.default.findOne({
              where: {
                miaId: oldItem.id
              }
            });

          case 3:
            item = _context2.sent;
            _context2.next = 6;
            return _detail2.default.build();

          case 6:
            detail = _context2.sent;
            _context2.next = 9;
            return detail.setItem(item);

          case 9:
            newClips = oldItem.views[0].annotations.map(function (clip, index) {
              var title = clip.title,
                  description = clip.description;

              return {
                title: title,
                description: description,
                index: index
              };
            });
            _context2.next = 12;
            return _clip2.default.bulkCreate(newClips);

          case 12:
            clips = _context2.sent;
            _context2.next = 15;
            return detail.addClips(clips);

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](0);

            console.error("createDetailAndClips exception", _context2.t0);

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 17]]);
  }));

  return function createDetailAndClips(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var createDetails = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(json) {
    var oldItems, oldItemKeys;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            oldItems = json.objects;
            oldItemKeys = Object.keys(oldItems);
            _context3.next = 5;
            return Promise.all(oldItemKeys.map(function (itemId) {
              return createDetailAndClips(oldItems[itemId]);
            }));

          case 5:
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            console.error("createDetails exception", _context3.t0);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function createDetails(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var associateBooksAndItems = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(json) {
    var oldItems, oldItemKeys;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            oldItems = json.objects;
            oldItemKeys = Object.keys(oldItems);
            _context4.next = 5;
            return Promise.all(oldItemKeys.map(function (itemId) {
              return bookAndItem(oldItems[itemId]);
            }));

          case 5:
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);

            console.error("associateBooksAndItems exception", _context4.t0);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 7]]);
  }));

  return function associateBooksAndItems(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var bookAndItem = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(oldItem) {
    var item, relatedBookMiaIds, relatedBooks;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _item2.default.findOne({
              where: {
                miaId: oldItem.id
              }
            });

          case 3:
            item = _context5.sent;
            relatedBookMiaIds = oldItem.relatedStories;
            _context5.next = 7;
            return Promise.all(relatedBookMiaIds.map(function (miaId) {
              return _book2.default.findOne({
                where: {
                  miaId: miaId.toString()
                }
              });
            }));

          case 7:
            relatedBooks = _context5.sent;

            if (!(relatedBooks.length > 0)) {
              _context5.next = 11;
              break;
            }

            _context5.next = 11;
            return item.addRelatedBooks(relatedBooks);

          case 11:
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5['catch'](0);

            console.error("bookAndItem exception", _context5.t0);

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 13]]);
  }));

  return function bookAndItem(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var createPages = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(json) {
    var oldBooks, oldBookKeys, pages;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            oldBooks = json.stories;
            oldBookKeys = Object.keys(oldBooks);
            _context6.next = 5;
            return Promise.all(oldBookKeys.map(function (miaId) {
              return pageSet(oldBooks[miaId]);
            }));

          case 5:
            pages = _context6.sent;
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            console.error("createPages exception", _context6.t0);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 8]]);
  }));

  return function createPages(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var pageSet = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(oldBook) {
    var newPages, book, pages, createdPages;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            newPages = oldBook.pages.map(function (page, index) {
              var type = page.type,
                  text = page.text,
                  video = page.video;

              return {
                type: type,
                text: text,
                index: index,
                video: video
              };
            });
            _context7.next = 4;
            return _book2.default.findOne({
              where: {
                miaId: oldBook.id
              }
            });

          case 4:
            book = _context7.sent;
            _context7.next = 7;
            return _page2.default.bulkCreate(newPages);

          case 7:
            pages = _context7.sent;
            _context7.next = 10;
            return book.addPages(pages);

          case 10:
            createdPages = _context7.sent;
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7['catch'](0);

            console.error("pageSet exception", _context7.t0);

          case 16:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[0, 13]]);
  }));

  return function pageSet(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var createBooks = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(json) {
    var oldBooks, oldBookKeys, bookData;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            oldBooks = json.stories;
            oldBookKeys = Object.keys(oldBooks);
            bookData = oldBookKeys.map(function (miaId) {
              return {
                miaId: miaId,
                title: oldBooks[miaId].title
              };
            });
            _context8.next = 6;
            return _book2.default.bulkCreate(bookData);

          case 6:
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](0);

            console.error("createBooks exception", _context8.t0);

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 8]]);
  }));

  return function createBooks(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

var createItems = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(json) {
    var oldItems, oldItemKeys, itemData, rows;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            oldItems = json.objects;
            oldItemKeys = Object.keys(oldItems);
            _context9.next = 5;
            return Promise.all(oldItemKeys.map(function (miaItemId) {
              return getItemData(miaItemId);
            }));

          case 5:
            itemData = _context9.sent;
            _context9.next = 8;
            return _item2.default.bulkCreate(itemData);

          case 8:
            rows = _context9.sent;
            _context9.next = 14;
            break;

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9['catch'](0);

            console.error("creatItems error", _context9.t0);

          case 14:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[0, 11]]);
  }));

  return function createItems(_x8) {
    return _ref9.apply(this, arguments);
  };
}();

var getItemData = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(id) {
    var response, _ref11, miaId, title, medium, artist, dated, accessionNumber, currentLocation, creditLine, text;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return (0, _isomorphicUnfetch2.default)('https://search.artsmia.org/id/' + id);

          case 3:
            response = _context10.sent;
            _context10.next = 6;
            return response.json();

          case 6:
            _ref11 = _context10.sent;
            miaId = _ref11.id;
            title = _ref11.title;
            medium = _ref11.medium;
            artist = _ref11.artist;
            dated = _ref11.dated;
            accessionNumber = _ref11.accession_number;
            currentLocation = _ref11.room;
            creditLine = _ref11.creditline;
            text = _ref11.text;
            return _context10.abrupt('return', {
              miaId: miaId,
              title: title,
              medium: medium,
              artist: artist,
              dated: dated,
              accessionNumber: accessionNumber,
              currentLocation: currentLocation,
              creditLine: creditLine,
              text: text
            });

          case 19:
            _context10.prev = 19;
            _context10.t0 = _context10['catch'](0);

            logEx("getItemData exception with", _context10.t0);

          case 22:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[0, 19]]);
  }));

  return function getItemData(_x9) {
    return _ref10.apply(this, arguments);
  };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _isomorphicUnfetch = require('isomorphic-unfetch');

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _item = require('../models/item');

var _item2 = _interopRequireDefault(_item);

var _book = require('../models/book');

var _book2 = _interopRequireDefault(_book);

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

var _detail = require('../models/detail');

var _detail2 = _interopRequireDefault(_detail);

var _clip = require('../models/clip');

var _clip2 = _interopRequireDefault(_clip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var response, json;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _isomorphicUnfetch2.default)("https://new.artsmia.org/crashpad/");

        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();

        case 6:
          json = _context.sent;
          _context.next = 9;
          return createItems(json);

        case 9:
          _context.next = 11;
          return createBooks(json);

        case 11:
          _context.next = 13;
          return createPages(json);

        case 13:
          _context.next = 15;
          return associateBooksAndItems(json);

        case 15:
          _context.next = 17;
          return createDetails(json);

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context['catch'](0);

          console.error("big function exception", _context.t0);

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 19]]);
}));