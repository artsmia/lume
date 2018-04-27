import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import mediaFragment from '../fragments/media'

export const MediasQuery = gql`
  query MediasQuery (
    $filter: FilterInput
  ) {
    medias (
      filter: $filter
    ) {
      ...MediaFragment
    }
  }
  ${mediaFragment}
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

export default graphql(MediasQuery, queryOptions)
