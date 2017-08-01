import book from './book'
import clip from './clip'
import detail from './detail'
import group from './group'
import image from './image'
import item from './item'
import page from './page'
import user from './user'

export async function createAssociations() {
  try {

    item.belongsToMany(group, { as: 'groups', through: 'item_group', foreignKey: 'itemId' })
    group.belongsToMany(item, { as: 'items', through: 'item_group', foreignKey: 'groupId' })

    item.belongsToMany(book, { as: 'relatedBooks', through: 'item_book', foreignKey: 'itemId' })
    book.belongsToMany(item, { as: 'relatedItems', through: 'item_book', foreignKey: 'bookId' })

    item.hasOne(detail, {as: "detail"})
    detail.belongsTo(item, {as: "item"})

    detail.hasMany(clip, {as: "clips"})
    clip.belongsTo(detail, {as: "detail"})

    book.hasMany(page, {as: "pages"})
    page.belongsTo(book, {as: "book"})

    page.hasMany(image, {as: "images"})

    item.hasOne(image, {as: "mainImage"})

    detail.hasMany(image, {as: "additionalImages"})

    item.belongsToMany(item, {as: "relatedItems", through: "item_item"})
  } catch (ex) {

    console.log("createAssociations ex", ex)

  }
}
