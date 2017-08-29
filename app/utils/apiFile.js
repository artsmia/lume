import {apiUrl} from '../config'

export default async function(file, orgId) {
  try {

    let form = new FormData()
    form.append('file', file)
    form.append("bucket", orgId)

    const resp = await fetch(`${apiUrl}/image`,{
      method: "POST",
      body: form
    })

    const {data: {editOrCreateImage}} = await resp.json()

    return editOrCreateImage

  } catch (ex) {
    console.error(ex)
  }
}
