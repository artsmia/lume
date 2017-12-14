import {
  GraphQLObjectType,
} from 'graphql'

import organization from './organization'
import content from './content'
import user from './user'
import organizations from './organizations'
import story from './story'
import stories from './stories'
import image from './image'


const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    organization,
    content,
    user,
    organizations,
    story,
    stories,
    image
  }
})

export default query
