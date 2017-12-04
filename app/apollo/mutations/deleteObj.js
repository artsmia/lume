
import gql from 'graphql-tag'

const mutation = gql`
mutation deleteObj (
  $objId: ID!
) {
  deleteObj(
    id: $objId
  ) {
    message
  }
}

`

export default mutation
