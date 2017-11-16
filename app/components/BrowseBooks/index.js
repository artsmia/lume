import {graphql, compose } from 'react-apollo'
import BrowseBooks from './BrowseBooks'
import newBook from '../../apollo/mutations/editOrCreateBook'
import gql from 'graphql-tag'

const query = gql`
  query booksQuery (
    $search: String
    $filter: Filter
    $orgSub: String
  ) {
    books (
      search: $search
      filter: $filter
      orgSub: $orgSub
    ) {
      id
      title
      previewImage {
        id
      }
      updatedAt
    }
    organization (
      orgSub: $orgSub
    ) {
      id
    }
  }


`


const queryConfig = {
  options: ({orgSub}) => {

    const filter = {
      limit: 20,
      order: {
        column: "updatedAt",
        direction: "DESC"
      }
    }
    return {
      variables: {
        orgSub,
        filter: {
          ...filter,
        }
      },
    }

  }
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
        query,
        variables: {
          orgSub,
          search
        }
      })
      data.books.push(editOrCreateBook)
      store.writeQuery({
        query,
        variables: {
          orgSub,
          search
        },
        data
      })
    }
  })
}




export default compose(
  graphql(query, queryConfig),
  graphql(newBook, mutationConfig)
)(
  BrowseBooks
)
