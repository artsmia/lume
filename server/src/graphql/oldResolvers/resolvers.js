//queries
import thematic from './queries/thematic'
import detail from './queries/detail'
import group from './queries/group'
import image from './queries/image'
import images from './queries/images'

import obj from './queries/obj'
import organization from './queries/organization'
import page from './queries/page'
import user from './queries/user'


import organizations from './queries/organizations'
import objs from './queries/objs'
import thematics from './queries/thematics'


import Organization from './root/Organization'
import Obj from './root/Obj'
import User from './root/User'
import Image from './root/Image'
import Detail from './root/Detail'
import Thematic from './root/Thematic'
import Page from './root/Page'


//mutations
import editOrCreateObj from './mutations/editOrCreateObj'
import editOrCreateOrganization from './mutations/editOrCreateOrganization'
import editOrCreateImage from './mutations/editOrCreateImage'
import editOrCreateDetail from './mutations/editOrCreateDetail'
import editOrCreateThematic from './mutations/editOrCreateThematic'
import editOrCreatePage from './mutations/editOrCreatePage'



import deleteObj from './mutations/deleteObj'
import deleteDetail from './mutations/deleteDetail'
import deleteThematic from './mutations/deleteThematic'
import deletePage from './mutations/deletePage'

const resolvers = {
  Query: {
    thematic,
    detail,
    group,
    image,
    images,
    obj,
    organization,
    page,
    objs,
    thematics,
    user,
    organizations
  },
  Mutation: {
    editOrCreateObj,
    editOrCreateOrganization,
    editOrCreateImage,
    editOrCreateDetail,
    editOrCreateThematic,
    editOrCreatePage,
    deleteObj,
    deleteDetail,
    deleteThematic,
    deletePage
  },
  Obj,
  User,
  Organization,
  Image,
  Detail,
  Thematic,
  Page
}

export default resolvers
