import router from 'next/router'
import Cookie from 'js-cookie'

export default async function getUser(ctx){
  try {


    if (process.env.AUTH_STRATEGY === 'local'){
      return {
        id: 'local'
      }
    }


    if (
      ctx.req
    ){

      let {user} = ctx.req.session.passport

      return user
    }

    if (
      process.browser
    ) {
      let user = {
        id: Cookie.get('userId'),
        idToken: Cookie.get('idToken')

      }

      return user
    }


  } catch (ex) {
    console.error(ex)
    redirect(ctx)
  }
}


export const redirect = (ctx) => {
  if (ctx.res){
    ctx.res.writeHead(303, { Location: '/' })
    ctx.res.end()
  } else {
    router.replace('/')
  }
}
