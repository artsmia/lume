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
      return data
    },
    setSaveStatus(obj, variables, {cache}, info){
      const data = {
        saveStatus: {
          __typename: "SaveStatus",
          ...variables
        }
      }

      cache.writeData({data})
      return data
    }
  }
}
