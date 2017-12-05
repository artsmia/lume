import Tombstone from './Tombstone'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query TombstoneQuery (
    $objId: ID!
  ) {
    obj (
      id: $objId
    ) {
      id
      accessionNumber
      attribution
      creditLine
      culture
      currentLocation
      date
      dimensions
      medium
      title
    }
  }


`

const config = {
  options: ({objId}) => ({
    variables: {
      objId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  Tombstone
)

export const PreviewObj = Tombstone
