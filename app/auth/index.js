import {auth0ID, auth0Domain} from '../config'
import Auth0 from 'auth0-lock'
import Cookies from 'js-cookie'


export function createLock () {
  return new Auth0(auth0ID, auth0Domain, {
    auth: {
      responseType: 'token',
      redirectUrl: 'http://localhost:3000/auth',
    }
  })
}

export async function hashToCookies() {
  try {
    const hash = window.location.hash
    const IDToken = hash.split('id_token=')[1].split('&')[0]
    Cookies.set('IDToken', IDToken)
    
  } catch (ex) {
    console.log(ex)
  }

}


export async function getIDToken(context){
  try {
    if (
      process.browser &&
      Cookies.get('IDToken')
    ) {
      return Cookies.get('IDToken')
    } else if (
      context.query.IDToken
    ) {
      return context.query.IDToken
    }
  } catch (ex) {
    console.log(ex)
  }
}
