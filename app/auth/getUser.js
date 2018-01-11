
export default async function getUser(ctx){
  try {
    if (process.env.AUTH_STRATEGY === 'local'){
      return {
        id: 'local'
      }
    }

    if (
      !process.browser &&
      ctx.req.session.passport
    ){
      return {
        ...ctx.req.session.passport.user
      }
    }

    if (process.browser) {
      if (
        localStorage.getItem('userId') &&
        localStorage.getItem('idToken')
      ) {
        return {
          id: localStorage.getItem('userId'),
          idToken: localStorage.getItem('idToken')
        }
      }
    }

    return {
      user: "error"
    }
  } catch (ex) {
    console.error(ex)
  }
}
