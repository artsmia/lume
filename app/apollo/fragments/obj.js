import gql from 'graphql-tag'
import imageFragment from './image'

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
      ...ImageFragment
    }
  }
  ${imageFragment}
`

export default fragment
