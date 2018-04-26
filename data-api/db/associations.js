import {
  Category,
  Story,
  Picture,
  Content,
  Group,
  Image,
  Obj,
  Organization,
  User_Organization,
  Media
} from './models'


export async function createAssociations() {
  try {

    Category.hasMany(Group, {
      as: "groups"
    })

    Category.belongsTo(Image, {
      as: "image"
    })

    Category.belongsTo(Organization, {
      as: "organization"
    })


    Content.belongsTo(Story, {
      as: "story",
    })

    Content.belongsTo(Image, {
      as: "image0",
    })

    Content.belongsTo(Image, {
      as: "image1",
    })

    Content.belongsTo(Obj, {
      as: "obj",
    })

    Content.belongsToMany(Image, {
      as: "additionalImages",
      through: "content_image"
    })

    Content.belongsToMany(Media, {
      as: "additionalMedia",
      through: "content_media"
    })



    Group.belongsTo(Category, {
      as: "category"
    })

    Group.belongsTo(Image, {
      as: "image"
    })

    Group.belongsToMany(Story, {
      as: "groups",
      through: "story_group",
    })

    Image.hasMany(Group, {
      as: 'groups'
    })

    Image.belongsTo(Organization, {
      as: "organization"
    })

    Image.belongsToMany(Content, {
      as: "contents",
      through: "content_image"
    })

    Media.belongsTo(Organization, {
      as: "organization"
    })

    Media.belongsToMany(Content, {
      as: "contents",
      through: "content_media"
    })

    Obj.belongsTo(Image, {
      as: "primaryImage"
    })

    Obj.hasMany(Content, {
      as: "contents"
    })

    Obj.belongsTo(Organization, {
      as: "organization"
    })


    Organization.hasOne(Image, {
      as: "orgImage",
    })

    Organization.hasOne(Image, {
      as: "locationImage",
    })


    Organization.hasMany(Story, {
      as: "stories",
    })

    Organization.hasMany(Image, {
      as: "images"
    })

    Organization.hasMany(Media, {
      as: "medias"
    })


    Organization.hasMany(Obj, {
      as: "objs"
    })

    Organization.hasMany(Category, {
      as: "categories",
      constraints: false
    })

    Organization.hasMany(User_Organization, {
      as: "users"
    })

    Story.belongsToMany(Group, {
      as: "groups",
      through: "story_group",
    })

    Story.belongsToMany(Story, {
      as: "relatedStories",
      through: "story_story"
    })

    Story.belongsTo(Organization, {
      as: "organization"
    })

    Story.belongsTo(Image, {
      as: "previewImage",
    })

    Story.hasMany(Content, {
      as: 'contents'
    })

    User_Organization.belongsTo(Organization, {
      as: "organization"
    })


  } catch (ex) {

    console.log("createAssociations ex", ex)
    process.exit(1)
  }
}
