const editObj = `
  editObj(
    id: ID!
    title: String
    localId: String
    medium: String
    attribution: String
    dimensions: String
    culture: String
    date: String
    accessionNumber: String
    currentLocation: String
    creditLine: String
    text: String
    type: String
    pullFromCustomApi: Boolean
    primaryMediaType: MediaEnum
    primaryImageId: ID
    primaryVideoId: ID
  ): Obj
`

export default editObj
