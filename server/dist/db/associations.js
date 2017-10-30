'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAssociations = undefined;

var createAssociations = exports.createAssociations = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {

              _models.item.belongsToMany(_models.group, {
                as: 'groups',
                through: 'item_group',
                foreignKey: 'itemId'
              });
              _models.group.belongsToMany(_models.item, {
                as: 'items',
                through: 'item_group',
                foreignKey: 'groupId'
              });

              _models.book.belongsToMany(_models.group, {
                as: 'groups',
                through: 'book_group',
                foreignKey: 'bookId'
              });
              _models.group.belongsToMany(_models.book, {
                as: 'books',
                through: 'book_group',
                foreignKey: 'groupId'
              });

              _models.item.belongsToMany(_models.book, {
                as: 'relatedBooks',
                through: 'item_book',
                foreignKey: 'itemId'
              });
              _models.book.belongsToMany(_models.item, {
                as: 'relatedItems',
                through: 'item_book',
                foreignKey: 'bookId'
              });

              _models.detail.belongsTo(_models.item, {
                as: "item"
              });

              _models.item.hasMany(_models.detail, {
                as: "details"
              });

              _models.detail.belongsTo(_models.image, {
                as: "image"
              });

              _models.book.hasMany(_models.page, {
                as: "pages"
              });
              _models.page.belongsTo(_models.book, {
                as: "book"
              });

              _models.image.belongsTo(_models.organization, {
                as: "organization"
              });

              _models.organization.hasMany(_models.image, {
                as: "images"
              });

              _models.page.belongsToMany(_models.image, {
                as: "comparisonImages",
                through: "page_comparisonImage",
                foreignKey: "pageId"
              });

              _models.image.belongsToMany(_models.page, {
                as: "pageComparison",
                through: "page_comparisonImage",
                foreignKey: "imageId"
              });

              _models.page.hasOne(_models.image, {
                as: "mainPageImage"
              });

              _models.item.hasOne(_models.image, {
                as: "mainImage"
              });

              _models.book.hasOne(_models.image, {
                as: "previewImage"
              });

              _models.detail.belongsToMany(_models.image, {
                as: "additionalImages",
                through: "detail_image",
                foreignKey: "detailId"
              });

              _models.image.belongsToMany(_models.detail, {
                as: "detailAdditionalImages",
                through: "detail_image",
                foreignKey: "imageId"
              });

              _models.item.belongsToMany(_models.item, {
                as: "relatedItems",
                through: "item_item"
              });

              _models.item.belongsToMany(_models.organization, {
                as: "organizations",
                through: "item_organization",
                foreignKey: "itemId"
              });

              _models.organization.belongsToMany(_models.item, {
                as: "items",
                through: "item_organization",
                foreignKey: "organizationId"
              });

              _models.group.belongsToMany(_models.organization, {
                as: "organizations",
                through: "group_organization",
                foreignKey: "groupId"
              });

              _models.organization.belongsToMany(_models.group, {
                as: "groups",
                through: "group_organization",
                foreignKey: "organizationId"
              });

              _models.book.belongsToMany(_models.organization, {
                as: "organizations",
                through: "book_organization",
                foreignKey: "bookId"
              });

              _models.organization.belongsToMany(_models.book, {
                as: "books",
                through: "book_organization",
                foreignKey: "organizationId"
              });
            } catch (ex) {

              console.log("createAssociations ex", ex);
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createAssociations() {
    return _ref.apply(this, arguments);
  };
}();

var _models = require('./models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }