import { gql, graphql, compose } from 'react-apollo'
import EditItem from './EditItem'

const pageData = gql`
  query pageData (
    $itemId: ID!
    $userId: ID
  ) {
    item (id: $itemId) {
      id
      title
      artist
      medium
    }
    user (id: $userId) {
      id
      email
    }
  }
`

const editItem = gql`
  mutation editOrCreateItem (
    $itemId: ID
    $title: String
    $artist: String
  ) {
    editOrCreateItem (
      item: {
        id: $itemId
        title: $title
        artist: $artist
      }
    ) {
      id
      artist
      medium
    }
  }
`

export default compose(
  graphql(pageData, {
    options: ({userId, url: {query: {itemId}}}) => ({
      variables: {
        itemId,
        userId
      }
    })
  }),
  graphql(editItem, {
    name: "editItem",
  })
)(
  EditItem
)
