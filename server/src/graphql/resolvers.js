
import user from './queries/user'
import User from './root/User'

import Organization from './root/Organization'

import Item from './root/Item'
import item from './queries/item'
import organization from './queries/organization'
import organizations from './queries/organizations'

import items from './queries/items'
import editOrCreateItem from './mutations/editOrCreateItem'
import editOrCreateOrganization from './mutations/editOrCreateOrganization'

const resolvers = {
  Query: {
    item,
    items,
    user,
    organization,
    organizations
  },
  Mutation: {
    editOrCreateItem,
    editOrCreateOrganization
  },
  Item,
  User,
  Organization
}

export default resolvers
