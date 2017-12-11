import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query ImageListQuery (
    $filter: Filter
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
          subdomain
        },
      }
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}

export default graphql(query, queryOptions)
