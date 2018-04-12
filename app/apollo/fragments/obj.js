import gql from 'graphql-tag'

const fragment = gql`
  fragment ObjFragment on obj {
    id
    localId
    title
    description
    attribution
    date
    culture
    accessionNumber
    medium
    dimensions
    currentLocation
    creditLine
    description
    pullFromCustomApi
    primaryImage {
      id
      localId
    }
  }
`

export default fragment
