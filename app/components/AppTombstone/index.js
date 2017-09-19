import AppTombstone from './AppTombstone'
import ItemQuery from './query.graphql'
import { gql, graphql, compose } from 'react-apollo'

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
