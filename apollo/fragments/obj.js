import gql from 'graphql-tag'

const fragment = gql`
  fragment ObjFragment on obj {
    id
    localId
    title
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
    }
  }
`

export default fragment
