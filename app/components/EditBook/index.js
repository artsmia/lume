import { graphql, compose } from 'react-apollo'
import EditBook from './EditBook'
import query from './query.graphql'
import editOrCreateBook from '../../apollo/mutations/editOrCreateBook.graphql'
import editOrCreatePage from '../../apollo/mutations/editOrCreatePage.graphql'
import deleteBook from '../../apollo/mutations/deleteBook.graphql'


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
