//queries
import book from './queries/book'
import detail from './queries/detail'
import group from './queries/group'
import image from './queries/image'
import item from './queries/item'
import organization from './queries/organization'
import page from './queries/page'
import user from './queries/user'

import organizations from './queries/organizations'
import items from './queries/items'


import Organization from './root/Organization'
import Item from './root/Item'
import User from './root/User'

//mutations
import editOrCreateItem from './mutations/editOrCreateItem'
import editOrCreateOrganization from './mutations/editOrCreateOrganization'

const resolvers = {
  Query: {
    book,
    detail,
    group,
    image,
    item,
    organization,
    page,
    items,
    user,
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
