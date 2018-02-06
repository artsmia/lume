export default {
  Mutation: {
    flashSnack(obj, {message}, {cache}, info){


      const data = {
        snack: {
          __typename: "Snack",
          message,
          id: Math.random()
        }
      }

      cache.writeData({data})
    }
  }
}
