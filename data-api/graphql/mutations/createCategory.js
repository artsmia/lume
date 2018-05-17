import { GraphQLID, GraphQLNonNull } from 'graphql'
import categoryType from '../types/category'
import resolve from '../resolvers/createCategory'
import { OrganizationInput } from '../types/inputs'

const createCategory = {
  name: 'createCategory',
  type: categoryType,
  args: {
    organization: {
      type: new GraphQLNonNull(OrganizationInput)
    }
  },
  resolve
}

export default createCategory
