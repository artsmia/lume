import gql from 'graphql-tag'

const fragment = gql`
  fragment ObjEditorFragment on Obj {
    id
    title
    localId
    medium
    dimensions
    attribution
    date
    culture
    accessionNumber
    currentLocation
    creditLine
    description
    type
    primaryMediaType
    primaryImage {
      id
    }
    primaryVideo {
      id
    }
    pullFromCustomApi
    updatedAt
  }
`

export default fragment
