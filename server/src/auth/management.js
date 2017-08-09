import fetch from 'isomorphic-unfetch'

const managementEndpoint = "https://artsmia.auth0.com/api/v2/"

let managementToken
let expiration

export async function refreshToken(){
  try {
    const options =  {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: '3hrqWKRLV1E85m1EgQ1IiKSImi6JBEvi',
        client_secret: process.env.auth0ManagmentSecret,
        audience: managementEndpoint
      })
    }

    const response = await fetch('https://artsmia.auth0.com/oauth/token', options)

    const json = await response.json()

    expiration = json["expires_in"] * 1000 + Date.now()
    managementToken = json["access_token"]

  } catch (ex) {
    console.log(ex)
  }
}

export async function getUser(id){
  try {
    console.log(managementToken)
    if (
      !managementToken ||
      Date.now() > expiration
    ) {
      await refreshToken()
    }
    const options =  {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${managementToken}`
      }
    }
    const response = await fetch(`${managementEndpoint}users/${id}`, options)

    const json = await response.json()

    return json
  } catch (ex) {
    console.log(ex)
  }
}
