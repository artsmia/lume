import gql from 'graphql-tag'

const mutation = gql`
mutation editOrCreateDetail (
  $detailId: ID
  $objId: ID
  $title: String
  $imageId: ID
  $index: Int
  $newAdditionalImageIds: [ID]
  $geometry: GeometryInput
  $description: String
  $removeAdditionalImageIds: [ID]

) {
  editOrCreateDetail (
    id: $detailId
    objId: $objId
    title: $title
    imageId: $imageId
    index: $index
    newAdditionalImageIds: $newAdditionalImageIds
    removeAdditionalImageIds: $removeAdditionalImageIds
    geometry: $geometry
    description: $description
  ) {
    id
    title
    index
    description
    image {
      id
      organization {
        id
      }
    }
    additionalImages {
      id
    }
    geometry {
      type
      coordinates
    }
  }
}

`

export default mutation
