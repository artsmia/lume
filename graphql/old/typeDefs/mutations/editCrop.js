const editCrop = `
  editCrop(
    id: ID!
    detailId: ID!
    title: String
    description: String
    geometry: GeometryInput
    index: Int
  ): Crop
`

export default editCrop
