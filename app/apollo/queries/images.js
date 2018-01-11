import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ImagesQuery = gql`
  query ImagesQuery (
    $filter: FilterInput
  ) {
    images (
      filter: $filter
    ) {
      id
    }
  }
`


const queryOptions = {
  options: ({subdomain, imageId}) => {

    return {
      variables: {
        filter: {
          limit: 10,
          organization: {
            subdomain
          }
        },
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}

export default graphql(ImagesQuery, queryOptions)
