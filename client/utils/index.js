import uuid from 'uuid/v4'


export async function initGroups(){
  try {
    const response = await fetch('https://new.artsmia.org/crashpad/')

    const {
      objects: items,
      stories
    } = await response.json()
    const id = uuid()
    const title = "oldData"

    const defaultGroups = {
      [id]: {
        id,
        items,
        stories,
        title
      }
    }

    localStorage.setItem("groups", JSON.stringify(defaultGroups))
    return defaultGroups
  } catch (e) {
    console.error("initGroups failed")
  }
}

export async function getGroups(){
  try {
    const groupsString = localStorage.getItem("groups")
    let groups = JSON.parse(groupsString)
    if (!groups) {
      groups = await initGroups()
      return groups
    } else {
      return groups
    }
  } catch (e) {
    console.error("getGroups failed")
  }
}
