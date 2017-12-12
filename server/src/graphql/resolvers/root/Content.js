

const Content = {
  __resolveType(obj, context, info){

    switch (obj.type) {
      case "Comparison": {
        return "Comparison"
      }
      case "Detail": {
        return "Detail"
      }
      case "Movie": {
        return "Movie"
      }
      case "Obj": {
        return "Obj"
      }
      case "Picture": {
        return "Picture"
      }
      default: {

        return null
      }
    }
  },

}

export default Content
