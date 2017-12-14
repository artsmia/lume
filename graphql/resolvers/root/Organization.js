import User_Organization from '../../../db/models/User_Organization'

const Organization = {
  async role(org, args, ctx, info) {
    try {
      const userOrg =  await User_Organization.findOne({
        where: args
      })

      return userOrg.role
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default Organization
