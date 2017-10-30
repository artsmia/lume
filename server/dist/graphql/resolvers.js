'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require('./queries/book');

var _book2 = _interopRequireDefault(_book);

var _detail = require('./queries/detail');

var _detail2 = _interopRequireDefault(_detail);

var _group = require('./queries/group');

var _group2 = _interopRequireDefault(_group);

var _image = require('./queries/image');

var _image2 = _interopRequireDefault(_image);

var _item = require('./queries/item');

var _item2 = _interopRequireDefault(_item);

var _organization = require('./queries/organization');

var _organization2 = _interopRequireDefault(_organization);

var _page = require('./queries/page');

var _page2 = _interopRequireDefault(_page);

var _user = require('./queries/user');

var _user2 = _interopRequireDefault(_user);

var _organizations = require('./queries/organizations');

var _organizations2 = _interopRequireDefault(_organizations);

var _items = require('./queries/items');

var _items2 = _interopRequireDefault(_items);

var _books = require('./queries/books');

var _books2 = _interopRequireDefault(_books);

var _Organization = require('./root/Organization');

var _Organization2 = _interopRequireDefault(_Organization);

var _Item = require('./root/Item');

var _Item2 = _interopRequireDefault(_Item);

var _User = require('./root/User');

var _User2 = _interopRequireDefault(_User);

var _Image = require('./root/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Detail = require('./root/Detail');

var _Detail2 = _interopRequireDefault(_Detail);

var _Book = require('./root/Book');

var _Book2 = _interopRequireDefault(_Book);

var _Page = require('./root/Page');

var _Page2 = _interopRequireDefault(_Page);

var _editOrCreateItem = require('./mutations/editOrCreateItem');

var _editOrCreateItem2 = _interopRequireDefault(_editOrCreateItem);

var _editOrCreateOrganization = require('./mutations/editOrCreateOrganization');

var _editOrCreateOrganization2 = _interopRequireDefault(_editOrCreateOrganization);

var _editOrCreateImage = require('./mutations/editOrCreateImage');

var _editOrCreateImage2 = _interopRequireDefault(_editOrCreateImage);

var _editOrCreateDetail = require('./mutations/editOrCreateDetail');

var _editOrCreateDetail2 = _interopRequireDefault(_editOrCreateDetail);

var _editOrCreateBook = require('./mutations/editOrCreateBook');

var _editOrCreateBook2 = _interopRequireDefault(_editOrCreateBook);

var _editOrCreatePage = require('./mutations/editOrCreatePage');

var _editOrCreatePage2 = _interopRequireDefault(_editOrCreatePage);

var _deleteItem = require('./mutations/deleteItem');

var _deleteItem2 = _interopRequireDefault(_deleteItem);

var _deleteDetail = require('./mutations/deleteDetail');

var _deleteDetail2 = _interopRequireDefault(_deleteDetail);

var _deleteBook = require('./mutations/deleteBook');

var _deleteBook2 = _interopRequireDefault(_deleteBook);

var _deletePage = require('./mutations/deletePage');

var _deletePage2 = _interopRequireDefault(_deletePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mutations
//queries
var resolvers = {
  Query: {
    book: _book2.default,
    detail: _detail2.default,
    group: _group2.default,
    image: _image2.default,
    item: _item2.default,
    organization: _organization2.default,
    page: _page2.default,
    items: _items2.default,
    books: _books2.default,
    user: _user2.default,
    organizations: _organizations2.default
  },
  Mutation: {
    editOrCreateItem: _editOrCreateItem2.default,
    editOrCreateOrganization: _editOrCreateOrganization2.default,
    editOrCreateImage: _editOrCreateImage2.default,
    editOrCreateDetail: _editOrCreateDetail2.default,
    editOrCreateBook: _editOrCreateBook2.default,
    editOrCreatePage: _editOrCreatePage2.default,
    deleteItem: _deleteItem2.default,
    deleteDetail: _deleteDetail2.default,
    deleteBook: _deleteBook2.default,
    deletePage: _deletePage2.default
  },
  Item: _Item2.default,
  User: _User2.default,
  Organization: _Organization2.default,
  Image: _Image2.default,
  Detail: _Detail2.default,
  Book: _Book2.default,
  Page: _Page2.default
};

exports.default = resolvers;