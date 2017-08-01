import fetch from 'isomorphic-fetch'
import {apiUrl} from '../config'

export default async function(query){
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    })

    const {data} = await response.json()

    console.log(data)

    return data
  } catch (ex) {
    console.log("apiFetch ex", ex)
  }
}
