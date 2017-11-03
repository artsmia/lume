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



      let users = await Promise.all(
        userOrgs.map( ({userId}) => getUser(userId))
      )

      users.forEach( user => {
        user.id = user["user_id"]

        let {
          dataValues: {
            role
          }
        } = userOrgs.find( ({dataValues}) => dataValues.userId === user.id)

        user.role = role

      })

      return users
    } catch (ex) {
      console.error(ex)
    }
  },
  async items(org, args){
    try {


      const items = await org.getItems()

      return items
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
  async images(org, args){
    try {

      console.log("here")
      const images = await org.getImages()


      return images
    } catch (ex) {
      console.error(ex)
    }
  },
}

export default Organization
