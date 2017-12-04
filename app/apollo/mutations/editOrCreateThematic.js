
import gql from 'graphql-tag'

const mutation = gql`
mutation editOrCreateThematic (
  $thematicId: ID
  $title: String
  $previewImageId: ID
  $newOrganizationIds: [ID]
  $createPageThematicId: ID
) {
  editOrCreateThematic (
    id: $thematicId
    title: $title
    previewImageId: $previewImageId
    newOrganizationIds: $newOrganizationIds
    createAndAddPage: {
      thematicId: $createPageThematicId
    }
  ) {
    id
    title
    previewImage {
      id
    }
    pages {
      id
      title
      index
    }
  }
}
`

export default mutation
