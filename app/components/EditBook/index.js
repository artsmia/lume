import { graphql, compose } from 'react-apollo'
import EditBook from './EditBook'
import editOrCreateBook from '../../apollo/mutations/editOrCreateBook'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage'
import deleteBook from '../../apollo/mutations/deleteBook'
import gql from 'graphql-tag'

const query = gql`
  query BookQuery (
    $bookId: ID!
    $userId: ID
    $orgSub: String
  ) {
    book (id: $bookId) {
      id
      title
      previewImage {
        id
      }
      pages {
        id
        title
        index
      }
    }
    user (id: $userId) {
      id
      email
    }
    organization (
      orgSub: $orgSub
    ) {
      id
    }
  }
`


const queryOptions = {
  options: ({userId, orgSub, bookId}) => ({
    variables: {
      bookId,
      userId,
      orgSub
    }
  })
}

export default compose(
  graphql(query, queryOptions),
  graphql(editOrCreateBook, {
    name: "editBook",
  }),
  graphql(deleteBook, {
    name: "deleteBook",
  }),
  graphql(editOrCreatePage, {
    name: "editPage",
  }),
)(
  EditBook
)
