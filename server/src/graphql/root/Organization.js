import organizationModel from '../../db/models/organization'
import groupModel from '../../db/models/group'
import userOrganizationModel from '../../db/models/userOrganization'
import {getUser} from '../../auth/management'

const Organization = {
  async users(obj, args){
    try {
      const {
        id
      } = obj.dataValues
      const userOrgs = await userOrganizationModel.findAll({
        where: {
          organizationId: id
        }
      })



      const users = await Promise.all(
        userOrgs.map( ({userId}) => getUser(userId))
      )

      users.forEach( user => {
        user.id = user["user_id"]
      })

      return users
    } catch (ex) {
      console.error(ex)
    }
  },
  async items(obj, args){
    try {


      return await obj.getItems()
    } catch (ex) {
      console.error(ex)
    }
  },
  async groups(obj, args){
    try {

      return await obj.getGroups()
    } catch (ex) {
      console.error(ex)
    }
  },
  async books(obj, args){
    try {
      return await obj.getBooks()
    } catch (ex) {
      console.error(ex)
    }
  },
  async images(obj, args){
    try {
      return await obj.getImages()
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Organization
