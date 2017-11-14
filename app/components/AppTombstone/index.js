import AppTombstone from './AppTombstone'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query TombstoneQuery (
    $itemId: ID!
  ) {
    item (
      id: $itemId
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
  options: ({itemId}) => ({
    variables: {
      itemId
    }
  })
}

export default compose(
  graphql(ItemQuery, config),
)(
  AppTombstone
)

export const PreviewAppItem = AppTombstone
