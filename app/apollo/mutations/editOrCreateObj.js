
import gql from 'graphql-tag'

const mutation = gql`
mutation editOrCreateObj (
  $objId: ID
  $title: String
  $attribution: String
  $medium: String
  $culture: String
  $date: String
  $dimensions: String
  $accessionNumber: String
  $currentLocation: String
  $creditLine: String
  $localId: String
  $pullFromCustomApi: Boolean
  $text: String
  $mainImageId: ID
  $newOrganizationIds: [ID]
  $createDetailObjId: ID
  $createDetailImageId: ID
  $newRelatedThematicIds: [ID]
  $removeRelatedThematicIds: [ID]
) {
  editOrCreateObj (
    obj: {
      id: $objId
      title: $title
      attribution: $attribution
      medium: $medium
      date: $date
      dimensions: $dimensions
      localId: $localId
      pullFromCustomApi: $pullFromCustomApi
      accessionNumber: $accessionNumber
      currentLocation: $currentLocation
      creditLine: $creditLine
      text: $text
      culture: $culture
    }
    mainImageId: $mainImageId
    newOrganizationIds: $newOrganizationIds
    createAndAddDetail: {
      objId: $createDetailObjId
      imageId: $createDetailImageId
    }
    newRelatedThematicIds: $newRelatedThematicIds
    removeRelatedThematicIds: $removeRelatedThematicIds
  ) {
    id
    title
    attribution
    medium
    culture
    attribution
    dimensions
    date
    localId
    pullFromCustomApi
    accessionNumber
    currentLocation
    creditLine
    text
    mainImage {
      id
    }
    details {
      id
      title
      index
      image {
        id
        organization {
          id
        }
        host
      }
    }
    relatedThematics {
      id
      title
    }
  }
}

`

export default mutation
