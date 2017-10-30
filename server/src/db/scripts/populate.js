import 'dotenv/config'
import fetch from 'isomorphic-unfetch'
import db from '../connect'
import organizationModel from '../models/organization'
import itemModel from '../models/item'
import {createAssociations} from '../associations'


async function populate() {
  try {

    await createAssociations()

    const response = await fetch("https://new.artsmia.org/crashpad/")
    const json = await response.json()

    let organization


    const createOrganization = async () => {
      try {

        organization = await organizationModel.create({
          subdomain: "mia",
          name: "Minneapolis Institute of Art",
          customItemApiEnabled: true,
          customItemApiEndpoint: "http://localhost:5000/item/mia"
        })


      } catch (ex) {
        console.error(ex)
      }
    }


    const createItems = async () => {
      try {

        const localIds = Object.keys(json.objects)

        const items = localIds.map( (localId) => ({
          localId,
          pullFromCustomApi: true,
          organizationId: organization.id,
        }))

        const itemModels = await itemModel.bulkCreate(items)

        await organization.addItems(itemModels)




      } catch (ex) {
        console.error(ex)
      }
    }

    await createOrganization()

    await createItems()

    process.exit()

  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }
}

populate()
