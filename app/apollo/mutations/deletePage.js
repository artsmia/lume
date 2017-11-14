
import gql from 'graphql-tag'

const mutation = gql`
mutation deletePage (
  $pageId: ID!
) {
  deletePage(
    id: $pageId
  ) {
    id
    pages {
      id
      index
      title
    }
  }
}
`

export default mutation
