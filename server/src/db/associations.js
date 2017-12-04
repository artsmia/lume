import {
  thematic,
  detail,
  group,
  image,
  obj,
  page,
  organization,
} from './models'



export async function createAssociations() {
  try {

    detail.belongsTo(obj, {
      as: "obj",
    })

    obj.hasMany(detail, {
      as: "details"
    })

    detail.belongsTo(image, {
      as: "image",
    })

    image.hasMany(detail, {
      as: "details"
    })

    page.belongsTo(thematic, {
      as: "thematic"
    })

    thematic.hasMany(page, {
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

    image.hasMany(obj, {
      foreignKey: "mainImageId",
    })

    obj.belongsTo(image, {
      as: "mainImage",
      foreignKey: "mainImageId",
    })

    image.hasMany(thematic, {
      foreignKey: "previewImageId"
    })

    thematic.belongsTo(image, {
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

    obj.belongsToMany(group, {
      as: 'groups',
      through: 'obj_group',
      foreignKey: 'objId'
    })
    group.belongsToMany(obj, {
      as: 'objs',
      through: 'obj_group',
      foreignKey: 'groupId'
    })

    thematic.belongsToMany(group, {
      as: 'groups',
      through: 'thematic_group',
      foreignKey: 'thematicId'
    })
    group.belongsToMany(thematic, {
      as: 'thematics',
      through: 'thematic_group',
      foreignKey: 'groupId'
    })

    obj.belongsToMany(thematic, {
      as: 'relatedThematics',
      through: 'obj_thematic',
      foreignKey: 'objId'
    })
    thematic.belongsToMany(obj, {
      as: 'relatedObjs',
      through: 'obj_thematic',
      foreignKey: 'thematicId'
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

    obj.belongsToMany(obj, {
      as: "relatedObjs",
      through: "obj_obj"
    })

    obj.belongsToMany(organization, {
      as: "organizations",
      through: "obj_organization",
      foreignKey: "objId"
    })

    organization.belongsToMany(obj, {
      as:"objs",
      through: "obj_organization",
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

    thematic.belongsToMany(organization, {
      as: "organizations",
      through: "thematic_organization",
      foreignKey: "thematicId"
    })

    organization.belongsToMany(thematic, {
      as:"thematics",
      through: "thematic_organization",
      foreignKey: "organizationId"
    })




  } catch (ex) {

    console.log("createAssociations ex", ex)
    process.exit(1)
  }
}
