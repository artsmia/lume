import gql from 'graphql-tag'

const mutation = gql`
  mutation deleteBook (
    $bookId: ID!
  ) {
    deleteBook(
      id: $bookId
    ) {
      message
    }
  }
`

export default mutation
