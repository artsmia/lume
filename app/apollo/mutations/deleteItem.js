
import gql from 'graphql-tag'

const mutation = gql`
mutation deleteItem (
  $itemId: ID!
) {
  deleteItem(
    id: $itemId
  ) {
    message
  }
}

`

export default mutation
