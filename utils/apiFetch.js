import fetch from 'isomorphic-fetch'
import {apiUrl} from '../config'


export default async function(query, IDToken){
  try {

    const authHeaders = (IDToken) ? {
      "Authorization": `Bearer ${IDToken}`
    } : {}

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...authHeaders
      },
      body: JSON.stringify({
        query: query
      })
    })

    const {data} = await response.json()

    return data
  } catch (ex) {
    console.log("apiFetch ex", ex)
  }
}
