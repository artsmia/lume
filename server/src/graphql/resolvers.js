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
import Image from './root/Image'
import Detail from './root/Detail'


//mutations
import editOrCreateItem from './mutations/editOrCreateItem'
import editOrCreateOrganization from './mutations/editOrCreateOrganization'
import editOrCreateImage from './mutations/editOrCreateImage'
import editOrCreateDetail from './mutations/editOrCreateDetail'


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
    editOrCreateOrganization,
    editOrCreateImage,
    editOrCreateDetail
  },
  Item,
  User,
  Organization,
  Image,
  Detail
}

export default resolvers
