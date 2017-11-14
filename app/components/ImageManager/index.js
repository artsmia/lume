import { graphql, compose } from 'react-apollo'
import ImageManager from './ImageManager'
import gql from 'graphql-tag'

const query = gql`
  query orgImageQuery (
    $filter: Filter
    $imageId: ID!
    $search: String
  ) {
    images (
      filter: $filter
      search: $search
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
  options: ({orgId, imageId}) => {

    return {
      variables: {
        filter: {
          limit: 10,
          organizationId: orgId
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
