import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'
import pageType from './page'
import itemType from './item'


const book = new GraphQLObjectType({
  name: "book",
  fields: ()=> ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    pages: {
      type: new GraphQLList(pageType)
    },
    relatedItems: {
      type: new GraphQLList(itemType)
    },
  })
})

export default book
