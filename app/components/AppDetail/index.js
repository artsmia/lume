import { graphql, compose } from 'react-apollo'
import AppDetail from './AppDetail'
import query from './query.graphql'

const config = {
  options: ({detailId}) => ({
    variables: {
      detailId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppDetail
)

export const PreviewAppItem = AppDetail
