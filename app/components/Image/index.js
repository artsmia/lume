import { graphql, compose } from 'react-apollo'
import Image from './Image'
import gql from 'graphql-tag'

const query = gql`
  query itemListData (
    $search: String
    $orgSub: String
    $filter: Filter
  ) {

    items (
      search: $search
      orgSub: $orgSub
      filter: $filter
    ) {
      id
      title
      mainImage {
        id
      }
      organizations {
        id
      }
    }
  }

`

const queryConfig = {
  options: ({imageId}) => ({
    variables: {
      imageId,
    },
  })
}






export default compose(
  graphql(query, queryConfig),
)(
  Image
)
