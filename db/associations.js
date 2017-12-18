import {
  Story,
  Picture,
  Content,
  Group,
  Image,
  Obj,
  Organization,
  User_Organization
} from './models'


export async function createAssociations() {
  try {


    Content.belongsTo(Story, {
      as: "story",
    })

    Content.belongsTo(Image, {
      as: "image0",
    })

    Group.belongsToMany(Story, {
      as: "groups",
      through: "story_group",
    })

    Group.belongsTo(Organization, {
      as: "organization"
    })


    Image.belongsTo(Organization, {
      as: "organization"
    })


    Obj.belongsTo(Image, {
      as: "primaryImage"
    })

    Organization.hasMany(Story, {
      as: "stories"
    })

    Organization.hasMany(Image, {
      as: "images"
    })

    Organization.hasMany(Group, {
      as: "group"
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


  } catch (ex) {

    console.log("createAssociations ex", ex)
    process.exit(1)
  }
}
