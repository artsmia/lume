import {
  GraphQLObjectType,
} from 'graphql'

import obj from './obj'
import objs from './objs'
import organization from './organization'
import content from './content'
import user from './user'
import organizations from './organizations'
import story from './story'
import stories from './stories'
import image from './image'
import images from './images'


const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    organization,
    content,
    user,
    organizations,
    story,
    stories,
    image,
    images,
    obj,
    objs
  }
})

export default query
