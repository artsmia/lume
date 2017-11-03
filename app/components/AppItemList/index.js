import { gql, graphql, compose } from 'react-apollo'
import AppItemList from './AppItemList'
import query from './query.graphql'


const config = {
  options: ({orgSub, search}) => ({
    variables: {
      orgSub,
      search,
      filter: {
        limit: 20
      }
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppItemList
)
