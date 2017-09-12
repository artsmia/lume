import { graphql, compose } from 'react-apollo'
import EditBook from './EditBook'
import query from './query.graphql'
import editOrCreateBook from '../../apollo/mutations/editOrCreateBook.graphql'
// import deleteItem from '../../apollo/mutations/deleteItem.graphql'


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
  // graphql(deleteItem, {
  //   name: "deleteItem",
  // })
)(
  EditBook
)
