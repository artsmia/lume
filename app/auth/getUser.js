import router from 'next/router'

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
        id: localStorage.getItem('userId'),
        idToken: localStorage.getItem('idToken')
      }

      if(!user.id || !user.idToken) throw 'nothing in local'

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
