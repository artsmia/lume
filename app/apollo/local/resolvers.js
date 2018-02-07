export default {
  Mutation: {
    showSnack(obj, {message}, {cache}, info){


      const data = {
        snack: {
          __typename: "Snack",
          message,
          snackId: Math.random()
        }
      }

      cache.writeData({data})
    },
    setSaveStatus(obj, {synced, saving, lastSave}, {cache}, info){
      const data = {
        saveStatus: {
          __typename: "SaveStatus",
          synced,
          saving,
          lastSave
        }
      }

      cache.writeData({data})
    }
  }
}
