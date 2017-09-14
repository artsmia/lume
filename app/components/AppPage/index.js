import { graphql, compose } from 'react-apollo'
import AppPage from './AppPage'
import query from './query.graphql'

const config = {
  options: ({pageId}) => ({
    variables: {
      pageId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppPage
)

export const PreviewAppItem = AppPage
