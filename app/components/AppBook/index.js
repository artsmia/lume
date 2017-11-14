import { gql, graphql, compose } from 'react-apollo'
import AppBook from './AppBook'
import gql from 'graphql-tag'

const query = gql`
  query BookQuery (
    $bookId: ID!
  ) {
    book (
      id: $bookId
    ) {
      id
      title
      pages {
        id
        index
      }
    }
  }

`


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
