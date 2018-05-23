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

Category.hasMany(Group, {
  as: 'groups',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'categoryId',
  sourceKey: 'id'
})

Category.belongsTo(Image, {
  as: 'image',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'imageId',
  sourceKey: 'id',
  constraints: false
})

Category.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  sourceKey: 'id'
})

Content.belongsTo(Story, {
  as: 'story',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'storyId',
  sourceKey: 'id'
})

Content.belongsTo(Image, {
  as: 'image0',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'image0Id',
  sourceKey: 'id'
})

Content.belongsTo(Image, {
  as: 'image1',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'image1Id',
  sourceKey: 'id'
})

Content.belongsTo(Obj, {
  as: 'obj',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'objId',
  sourceKey: 'id'
})

Content.belongsToMany(Image, {
  as: 'additionalImages',
  through: 'content_image'
})

Content.belongsToMany(Media, {
  as: 'additionalMedias',
  through: 'content_media'
})

Group.belongsTo(Category, {
  as: 'category',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'categoryId',
  sourceKey: 'id'
})

Group.belongsTo(Image, {
  as: 'image',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'imageId',
  sourceKey: 'id'
})

Group.belongsToMany(Story, {
  as: 'groups',
  through: 'story_group'
})

Image.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  sourceKey: 'id'
})

Image.belongsToMany(Content, {
  as: 'contents',
  through: 'content_image'
})

Media.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  sourceKey: 'id'
})

Media.belongsToMany(Content, {
  as: 'contents',
  through: 'content_media'
})

Obj.belongsTo(Image, {
  as: 'primaryImage',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'primaryImageId',
  sourceKey: 'id'
})

Obj.belongsTo(Media, {
  as: 'primaryMedia',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'primaryMediaId',
  sourceKey: 'id'
})

Obj.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  sourceKey: 'id'
})

Organization.belongsTo(Image, {
  as: 'orgImage',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'orgImageId',
  sourceKey: 'id',
  constraints: false
})

Organization.belongsTo(Image, {
  as: 'locationImage',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'locationImageId',
  sourceKey: 'id',
  constraints: false
})

Organization.hasMany(Story, {
  as: 'stories',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Organization.hasMany(Image, {
  as: 'images',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Organization.hasMany(Media, {
  as: 'medias',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Organization.hasMany(Obj, {
  as: 'objs',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Organization.hasMany(Category, {
  as: 'categories',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Organization.hasMany(User_Organization, {
  as: 'users',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

Story.belongsToMany(Group, {
  as: 'groups',
  through: 'story_group'
})

Story.belongsToMany(Story, {
  as: 'relatedStories',
  through: 'story_story'
})

Story.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  sourceKey: 'id'
})

Story.belongsTo(Image, {
  as: 'previewImage',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'previewImageId',
  sourceKey: 'id'
})

Story.hasMany(Content, {
  as: 'contents',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'storyId',
  targetKey: 'id'
})

User_Organization.belongsTo(Organization, {
  as: 'organization',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'id'
})

//
// export async function createAssociations() {
//   try {
//
//     Category.hasMany(Group, {
//       as: "groups"
//     })
//
//     Category.belongsTo(Image, {
//       as: "image"
//     })
//
//     Category.belongsTo(Organization, {
//       as: "organization"
//     })
//
//
//     Content.belongsTo(Story, {
//       as: "story",
//     })
//
//     Content.belongsTo(Image, {
//       as: "image0",
//     })
//
//     Content.belongsTo(Image, {
//       as: "image1",
//     })
//
//     Content.belongsTo(Obj, {
//       as: "obj",
//     })
//
//     Content.belongsToMany(Image, {
//       as: "additionalImages",
//       through: "content_image"
//     })
//
//     Content.belongsToMany(Media, {
//       as: "additionalMedias",
//       through: "content_media"
//     })
//
//
//
//     Group.belongsTo(Category, {
//       as: "category"
//     })
//
//     Group.belongsTo(Image, {
//       as: "image"
//     })
//
//     Group.belongsToMany(Story, {
//       as: "groups",
//       through: "story_group",
//     })
//
//     Image.hasMany(Group, {
//       as: 'groups'
//     })
//
//     Image.belongsTo(Organization, {
//       as: "organization"
//     })
//
//     Image.belongsToMany(Content, {
//       as: "contents",
//       through: "content_image"
//     })
//
//     Media.belongsTo(Organization, {
//       as: "organization"
//     })
//
//     Media.belongsToMany(Content, {
//       as: "contents",
//       through: "content_media"
//     })
//
//     Obj.belongsTo(Image, {
//       as: "primaryImage"
//     })
//
//     Obj.hasMany(Content, {
//       as: "contents"
//     })
//
//     Obj.belongsTo(Organization, {
//       as: "organization"
//     })
//
//
//     Organization.hasOne(Image, {
//       as: "orgImage",
//     })
//
//     Organization.hasOne(Image, {
//       as: "locationImage",
//     })
//
//
//     Organization.hasMany(Story, {
//       as: "stories",
//     })
//
//     Organization.hasMany(Image, {
//       as: "images"
//     })
//
//     Organization.hasMany(Media, {
//       as: "medias"
//     })
//
//
//     Organization.hasMany(Obj, {
//       as: "objs"
//     })
//
//     Organization.hasMany(Category, {
//       as: "categories",
//       constraints: false
//     })
//
//     Organization.hasMany(User_Organization, {
//       as: "users"
//     })
//
//     Story.belongsToMany(Group, {
//       as: "groups",
//       through: "story_group",
//     })
//
//     Story.belongsToMany(Story, {
//       as: "relatedStories",
//       through: "story_story"
//     })
//
//     Story.belongsTo(Organization, {
//       as: "organization"
//     })
//
//     Story.belongsTo(Image, {
//       as: "previewImage",
//     })
//
//     Story.hasMany(Content, {
//       as: 'contents'
//     })
//
//     User_Organization.belongsTo(Organization, {
//       as: "organization"
//     })
//
//
//   } catch (ex) {
//
//     console.log("createAssociations ex", ex)
//     process.exit(1)
//   }
// }
