import {
  story,
  picture,
  comparison,
  video,
  detail,
  group,
  image,
  obj,
  organization,
  movie,
  cropping,
  storyComparison,
  storyDetail,
  storyMovie,
  storyObj,
  storyPicture,
} from './models'



export async function createAssociations() {
  try {


    comparison.belongsToMany(story, {
      as: "stories",
      through: storyComparison,
    })

    comparison.belongsTo(image, {
      as: "comparisonImage0",
    })

    comparison.belongsTo(image, {
      as: "comparisonImage1",
    })

    cropping.belongsTo(detail, {
      as: "detail",
    })

    cropping.hasMany(cropping, {
      as: "croppings",
    })

    detail.belongsToMany(story, {
      as: "details",
      through: storyDetail,
    })

    detail.belongsTo(image, {
      as: "image"
    })

    group.belongsToMany(story, {
      as: "stories",
      through: "story_group",
    })

    group.belongsTo(organization, {
      as: "organization"
    })


    image.belongsTo(organization, {
      as: "organization"
    })

    movie.belongsToMany(story, {
      as: "stories",
      through: storyMovie,
    })

    movie.belongsTo(video, {
      as: "video"
    })

    obj.belongsToMany(story, {
      as: "objs",
      through: storyObj,
    })

    obj.belongsToMany(image, {
      as: "additionalImages",
      through: "obj_additionalImage"
    })

    obj.belongsToMany(video, {
      as: "additionalVideos",
      through: "obj_additionalVideo"
    })

    obj.belongsTo(image, {
      as: "primaryImage"
    })

    obj.belongsTo(video, {
      as: "primaryVideo"
    })

    organization.hasMany(story, {
      as: "stories"
    })

    organization.hasMany(image, {
      as: "images"
    })

    organization.hasMany(video, {
      as: "videos"
    })

    organization.hasMany(group, {
      as: "group"
    })

    picture.belongsToMany(story, {
      as: "stories",
      through: storyPicture,
    })

    picture.belongsTo(image, {
      as: "image"
    })

    story.belongsToMany(picture, {
      as: "pictures",
      through: storyPicture
    })

    story.belongsToMany(movie, {
      as: "movies",
      through: storyMovie
    })

    story.belongsToMany(comparison, {
      as: "comparisons",
      through: storyComparison
    })

    story.belongsToMany(detail, {
      as: "details",
      through: storyDetail
    })

    story.belongsToMany(obj, {
      as: "objs",
      through: storyObj
    })

    story.belongsToMany(group, {
      as: "groups",
      through: "story_group",
    })

    story.belongsTo(organization, {
      as: "organization"
    })

    story.belongsTo(image, {
      as: "previewImage",
    })

    video.belongsTo(organization, {
      as: "organization"
    })



    // detail.belongsTo(image, {
    //   as: "image",
    // })
    //
    // image.hasMany(detail, {
    //   as: "details"
    // })
    //
    //
    // image.belongsTo(organization, {
    //   as: "organization"
    // })
    //
    // organization.hasMany(image, {
    //   as: "images"
    // })
    //
    // image.hasMany(page, {
    //   foreignKey: "mainImageId"
    // })
    //
    // page.belongsTo(image, {
    //   as: "mainImage",
    //   foreignKey: "mainImageId"
    // })
    //
    // image.hasMany(obj, {
    //   foreignKey: "mainImageId",
    // })
    //
    // obj.belongsTo(image, {
    //   as: "mainImage",
    //   foreignKey: "mainImageId",
    // })
    //
    // image.hasMany(thematic, {
    //   foreignKey: "previewImageId"
    // })
    //
    // thematic.belongsTo(image, {
    //   as: "previewImage",
    //   foreignKey: "previewImageId"
    // })
    //
    // image.hasMany(page, {
    //   foreignKey: "comparisonImage0Id"
    // })
    //
    // page.belongsTo(image, {
    //   as: "comparisonImage0",
    //   foreginKey: "comparisonImage0Id"
    // })
    //
    // image.hasMany(page, {
    //   foreignKey: "comparisonImage1Id"
    // })
    //
    // page.belongsTo(image, {
    //   as: "comparisonImage1",
    //   foreignKey: "comparisonImage1Id"
    // })
    //
    // obj.belongsToMany(group, {
    //   as: 'groups',
    //   through: 'obj_group',
    //   foreignKey: 'objId'
    // })
    // group.belongsToMany(obj, {
    //   as: 'objs',
    //   through: 'obj_group',
    //   foreignKey: 'groupId'
    // })
    //
    // thematic.belongsToMany(group, {
    //   as: 'groups',
    //   through: 'thematic_group',
    //   foreignKey: 'thematicId'
    // })
    // group.belongsToMany(thematic, {
    //   as: 'thematics',
    //   through: 'thematic_group',
    //   foreignKey: 'groupId'
    // })
    //
    // obj.belongsToMany(thematic, {
    //   as: 'relatedThematics',
    //   through: 'obj_thematic',
    //   foreignKey: 'objId'
    // })
    // thematic.belongsToMany(obj, {
    //   as: 'relatedObjs',
    //   through: 'obj_thematic',
    //   foreignKey: 'thematicId'
    // })
    //
    //
    // detail.belongsToMany(image, {
    //   as: "additionalImages",
    //   through: "detail_image",
    //   foreignKey: "detailId"
    // })
    //
    // image.belongsToMany(detail, {
    //   as:"detailAdditionalImages",
    //   through: "detail_image",
    //   foreignKey: "imageId"
    // })
    //
    // obj.belongsToMany(obj, {
    //   as: "relatedObjs",
    //   through: "obj_obj"
    // })
    //
    // obj.belongsToMany(organization, {
    //   as: "organizations",
    //   through: "obj_organization",
    //   foreignKey: "objId"
    // })
    //
    // organization.belongsToMany(obj, {
    //   as:"objs",
    //   through: "obj_organization",
    //   foreignKey: "organizationId"
    // })
    //
    // group.belongsToMany(organization, {
    //   as: "organizations",
    //   through: "group_organization",
    //   foreignKey: "groupId"
    // })
    //
    // organization.belongsToMany(group, {
    //   as:"groups",
    //   through: "group_organization",
    //   foreignKey: "organizationId"
    // })
    //
    // thematic.belongsToMany(organization, {
    //   as: "organizations",
    //   through: "thematic_organization",
    //   foreignKey: "thematicId"
    // })
    //
    // organization.belongsToMany(thematic, {
    //   as:"thematics",
    //   through: "thematic_organization",
    //   foreignKey: "organizationId"
    // })
    //



  } catch (ex) {

    console.log("createAssociations ex", ex)
    process.exit(1)
  }
}
