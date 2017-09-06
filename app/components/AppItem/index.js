import { gql, graphql, compose } from 'react-apollo'
import AppItem from './AppItem'
import query from './query.graphql'

const config = {
  options: ({itemId}) => ({
    variables: {
      itemId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppItem
)

export const PreviewAppItem = AppItem
