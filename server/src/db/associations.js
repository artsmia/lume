import {
  book,
  clip,
  detail,
  group,
  image,
  item,
  page,
  organization,
} from './models'



export async function createAssociations() {
  try {


    item.belongsToMany(group, {
      as: 'groups',
      through: 'item_group',
      foreignKey: 'itemId'
    })
    group.belongsToMany(item, {
      as: 'items',
      through: 'item_group',
      foreignKey: 'groupId'
    })


    item.belongsToMany(book, {
      as: 'relatedBooks',
      through: 'item_book',
      foreignKey: 'itemId'
    })
    book.belongsToMany(item, {
      as: 'relatedItems',
      through: 'item_book',
      foreignKey: 'bookId'
    })

    detail.belongsTo(item, {
      as: "item",
    })

    item.hasMany(detail, {
      as: "details"
    })

    detail.belongsTo(image, {
      as: "image",
    })

    clip.belongsTo(detail, {as: "detail"})

    book.hasMany(page, {
      as: "pages"
    })
    page.belongsTo(book, {
      as: "book"
    })

    image.belongsTo(organization, {
      as: "organization"
    })

    organization.hasMany(image, {
      as: "images"
    })

    page.hasMany(image, {
      as: "images"
    })

    item.hasOne(image, {
      as: "mainImage"
    })

    clip.belongsToMany(image, {
      as: "additionalImages",
      through: "clip_image",
      foreignKey: "clipId"
    })

    image.belongsToMany(clip, {
      as:"clips",
      through: "clip_image",
      foreignKey: "imageId"
    })

    item.belongsToMany(item, {
      as: "relatedItems",
      through: "item_item"
    })

    item.belongsToMany(organization, {
      as: "organizations",
      through: "item_organization",
      foreignKey: "itemId"
    })

    organization.belongsToMany(item, {
      as:"items",
      through: "item_organization",
      foreignKey: "organizationId"
    })

    group.belongsToMany(organization, {
      as: "organizations",
      through: "group_organization",
      foreignKey: "groupId"
    })

    organization.belongsToMany(group, {
      as:"groups",
      through: "group_organization",
      foreignKey: "organizationId"
    })

    book.belongsToMany(organization, {
      as: "organizations",
      through: "book_organization",
      foreignKey: "bookId"
    })

    organization.belongsToMany(book, {
      as:"books",
      through: "book_organization",
      foreignKey: "organizationId"
    })




  } catch (ex) {

    console.log("createAssociations ex", ex)

  }
}
