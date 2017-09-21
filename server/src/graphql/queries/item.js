import itemModel from '../../db/models/item'
import orgModel from '../../db/models/organization'
import fetch from 'node-fetch'


export default async function item(src, {id}, ctx){
  try {
    let item = await itemModel.findById(id)

    if (
      item.pullFromCustomApi &&
      item.localId
    ) {
      let orgs = await item.getOrganizations()
      let org = orgs[0]
      if (
        org.customItemApiEnabled &&
        org.customItemApiEndpoint
      ) {

        let url = org.customItemApiEndpoint
        let options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: item.localId
          })
        }

        let response = await fetch(url, options)
        let json = await response.json()
        item = {
          ...item.dataValues,
          ...json.item
        }
      }
    }


    return item
  } catch (ex) {
    console.error(ex)
  }
}
