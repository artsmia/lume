import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import storiesFragment from '../fragments/stories'


export const StoriesQuery = gql`
  query StoriesQuery (
    $filter: FilterInput
  ) {
    stories (
      filter: $filter
    ) {
      ...StoriesFragment
    }

  }
  ${storiesFragment}

`


export const queryConfig = {
  options: (props) => {

    const {
      subdomain
    } = props.router.query

    return {
      variables: {
        filter: {
          organization: {
            subdomain
          },
          limit: 20,
          offset: 0,
          order: {
            column: "updatedAt",
            direction: "DESC"
          }
        }
      },
    }
  },
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(StoriesQuery, queryConfig)
