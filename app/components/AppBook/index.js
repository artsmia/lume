import { gql, graphql, compose } from 'react-apollo'
import AppBook from './AppBook'
import query from './query.graphql'

const config = {
  options: ({bookId}) => ({
    variables: {
      bookId
    }
  })
}

export default compose(
  graphql(query, config),
)(
  AppBook
)

export const PreviewAppItem = AppBook
