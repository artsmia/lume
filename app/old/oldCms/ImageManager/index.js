import { graphql, compose } from 'react-apollo'
import ImageManager from './ImageManager'
import gql from 'graphql-tag'

const query = gql`
  query orgImageQuery (
    $filter: Filter
    $imageId: ID!
    $search: String
    $subdomain: String
  ) {
    images (
      filter: $filter
      search: $search
      subdomain: $subdomain
    ) {
      id
    }
    image (
      id: $imageId
    ) {
      id
    }
    organization (
      subdomain: $subdomain
    ) {
      id
    }
  }


`

const queryOptions = {
  options: ({subdomain, imageId}) => {

    return {
      variables: {
        subdomain,
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
