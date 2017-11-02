import {
  book,
  detail,
  group,
  image,
  item,
  page,
  organization,
} from './models'



export async function createAssociations() {
  try {

    detail.belongsTo(item, {
      as: "item",
    })

    item.hasMany(detail, {
      as: "details"
    })

    detail.belongsTo(image, {
      as: "image",
    })

    image.hasMany(detail, {
      as: "details"
    })

    page.belongsTo(book, {
      as: "book"
    })

    book.hasMany(page, {
      as: "pages"
    })

    image.belongsTo(organization, {
      as: "organization"
    })

    organization.hasMany(image, {
      as: "images"
    })

    image.hasMany(page, {
      foreignKey: "mainImageId"
    })

    page.belongsTo(image, {
      as: "mainImage",
      foreignKey: "mainImageId"
    })

    image.hasMany(item, {
      foreignKey: "mainImageId",
    })

    item.belongsTo(image, {
      as: "mainImage",
      foreignKey: "mainImageId",
    })

    image.hasMany(book, {
      foreignKey: "previewImageId"
    })

    book.belongsTo(image, {
      as: "previewImage",
      foreignKey: "previewImageId"
    })

    image.hasMany(page, {
      foreignKey: "comparisonImage0Id"
    })

    page.belongsTo(image, {
      as: "comparisonImage0",
      foreginKey: "comparisonImage0Id"
    })

    image.hasMany(page, {
      foreignKey: "comparisonImage1Id"
    })

    page.belongsTo(image, {
      as: "comparisonImage1",
      foreignKey: "comparisonImage1Id"
    })

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

    book.belongsToMany(group, {
      as: 'groups',
      through: 'book_group',
      foreignKey: 'bookId'
    })
    group.belongsToMany(book, {
      as: 'books',
      through: 'book_group',
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


    detail.belongsToMany(image, {
      as: "additionalImages",
      through: "detail_image",
      foreignKey: "detailId"
    })

    image.belongsToMany(detail, {
      as:"detailAdditionalImages",
      through: "detail_image",
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
    process.exit(1)
  }
}
