import {
  book,
  clip,
  detail,
  group,
  image,
  item,
  page,
  user,
  organization
} from './models'

export async function createAssociations() {
  try {

    item.belongsToMany(group, { as: 'groups', through: 'item_group', foreignKey: 'itemId' })
    group.belongsToMany(item, { as: 'items', through: 'item_group', foreignKey: 'groupId' })

    item.belongsToMany(book, { as: 'relatedBooks', through: 'item_book', foreignKey: 'itemId' })
    book.belongsToMany(item, { as: 'relatedItems', through: 'item_book', foreignKey: 'bookId' })

    detail.belongsTo(item, {as: "item"})

    detail.hasMany(clip)

    book.hasMany(page, {as: "pages"})
    page.belongsTo(book, {as: "book"})

    page.hasMany(image, {as: "images"})

    item.hasOne(image, {as: "mainImage"})

    detail.hasMany(image, {as: "additionalImages"})

    item.belongsToMany(item, {as: "relatedItems", through: "item_item"})

    // user.belongsToMany(organization, {as: 'organizations', through: 'user_organization', foreignKey: 'userId'})
    //
    // organization.belongsToMany(user, {as: 'users', through: 'user_organization', foreignKey: 'organizationId'})


  } catch (ex) {

    console.log("createAssociations ex", ex)

  }
}
