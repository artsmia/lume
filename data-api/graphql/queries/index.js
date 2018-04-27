import {
  GraphQLObjectType,
} from 'graphql'
import authenticate from './authenticate'
import obj from './obj'
import objs from './objs'
import organization from './organization'
import category from './category'
import content from './content'
import group from './group'
import user from './user'
import users from './users'

import organizations from './organizations'
import story from './story'
import stories from './stories'
import image from './image'
import images from './images'
import medias from './medias'


const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    authenticate,
    organization,
    content,
    group,
    category,
    user,
    users,
    organizations,
    story,
    stories,
    image,
    images,
    obj,
    objs,
    medias
  }
})

export default query
