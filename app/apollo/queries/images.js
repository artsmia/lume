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
      localId
      title
      description
      organization {
        id
        subdomain
        customImageApiEnabled
        customImageEndpoint
      }
    }
  }
`


const queryOptions = {
  options: (props) => {
    const {
      subdomain
    } = props.router.query
    return {
      variables: {
        filter: {
          limit: 20,
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
