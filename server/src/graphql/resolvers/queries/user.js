import {getUser} from '../../../auth/management'

export default async function user(src, {id}, ctx){
  try {

    let userId = (id) ? id : ctx.userId


    const user = await getUser(userId)


    if (!user.id) {
      user.id = userId
    }


    return user
  } catch (ex) {
    console.error(ex)
  }
}
