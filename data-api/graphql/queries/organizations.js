import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from '../types/organization'
import {FilterInput} from '../types/inputs'
import resolve from '../resolvers/organizations'

const organizations = {
  name: "organizations",
  type: new GraphQLList(organizationType),
  args: {
    filter: {
      type: FilterInput
    },
  },
  resolve
}

export default organizations
