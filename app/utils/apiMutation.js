import fetch from 'isomorphic-fetch'
import {apiUrl} from '../config'

export default async function(mutation){
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: mutation
      })
    })

    const {data} = await response.json()

    return data
  } catch (ex) {
    console.log("apiFetch ex", ex)
  }
}
