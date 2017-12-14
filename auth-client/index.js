import {auth0ID, auth0Domain, url} from '../config'
import Auth0 from 'auth0-lock'
import Cookies from 'js-cookie'
import router from 'next/router'

export function createLock () {
  return new Auth0(auth0ID, auth0Domain, {
    auth: {
      responseType: 'token',
      redirectUrl: `${url}/auth`,
      params: {
        scope: "openid access_type=offline https://www.googleapis.com/auth/drive",
      }
    }
  })
}

export async function hashToCookies() {
  try {
    const hash = window.location.hash
    const IDTokenRegEx = /id_token=([^&]*)/g
    const accessTokenRegEx = /access_token=([^&]*)/g
    const IDToken = IDTokenRegEx.exec(hash)[1]
    const accessToken = accessTokenRegEx.exec(hash)[1]
    Cookies.set('IDToken', IDToken)
    Cookies.set("accessToken", accessToken)
    router.replace({
      pathname: '/auth'
    })
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


export async function logout(){
  try {
    Cookies.remove('IDToken')
    Cookies.remove('userId')
    router.push('/')
  } catch (ex) {
    console.error(ex)
  }
}
