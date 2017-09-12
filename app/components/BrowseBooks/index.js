import {graphql, compose } from 'react-apollo'
import BrowseBooks from './BrowseBooks'
import BooksQuery from './query.graphql'
import newBook from '../../apollo/mutations/editOrCreateBook.graphql'


const queryConfig = {
  options: ({orgSub}) => ({
    variables: {
      orgSub,
    },
  })
}



const mutationConfig = {
  name: "newBook",
  options: ({orgSub, search}) => ({
    optimisticResponse: {
      editOrCreateBook: {
        id: -1,
        __typename: "Book"
      }
    },
    update: (store, {data: {editOrCreateBook}}) => {
      let data = store.readQuery({
        query: BooksQuery,
        variables: {
          orgSub,
          search
        }
      })
      data.books.push(editOrCreateBook)
      store.writeQuery({
        query: BooksQuery,
        variables: {
          orgSub,
          search
        },
        data
      })
    }
  })
}


const query = graphql(BooksQuery, queryConfig)




export default compose(
  query,
  graphql(newBook, mutationConfig)
)(
  BrowseBooks
)
