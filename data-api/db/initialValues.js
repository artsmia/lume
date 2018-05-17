import {
  Category,
  Story,
  Picture,
  Content,
  Group,
  Image,
  Obj,
  Organization,
  User_Organization,
  Media
} from './models'
import db from './connect'

export default async function createInitialValues() {
  try {
    if (process.env.DB_MODE === 'sqlite') {
      let [LocalOrg] = await Organization.findOrCreate({
        where: {
          name: 'Local Organization',
          subdomain: 'local'
        }
      })

      await User_Organization.findOrCreate({
        where: {
          userId: 'local',
          organizationId: LocalOrg.id,
          role: 'admin'
        }
      })
    }
  } catch (ex) {
    console.error(ex)
  }
}
