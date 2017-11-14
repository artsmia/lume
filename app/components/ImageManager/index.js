import { graphql, compose } from 'react-apollo'
import ImageManager from './ImageManager'
import gql from 'graphql-tag'

const query = gql`
  query orgImageQuery (
    $filter: Filter
    $imageId: ID!
    $search: String
    $orgSub: String
  ) {
    images (
      filter: $filter
      search: $search
      orgSub: $orgSub
    ) {
      id
    }
    image (
      id: $imageId
    ) {
      id
    }
  }


`

const queryOptions = {
  options: ({orgSub, imageId}) => {

    return {
      variables: {
        orgSub,
        filter: {
          limit: 10,
        },
        imageId: imageId || ""
      }
    }
  }
}

export default compose(
  graphql(query, queryOptions),
)(
  ImageManager
)
