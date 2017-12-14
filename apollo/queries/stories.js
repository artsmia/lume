import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import storyFragment from '../fragments/story'


export const StoryListQuery = gql`
  query StoryList (
    $filter: FilterInput
  ) {
    stories (
      filter: $filter
    ) {
      ...StoryFragment
    }

  }
  ${storyFragment}

`


export const queryConfig = {
  options: ({subdomain}) => ({
    variables: {
      filter: {
        organization: {
          subdomain
        },
        limit: 10,
        offset: 0,
        order: {
          column: "updatedAt",
          direction: "DESC"
        }
      }
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(StoryListQuery, queryConfig)
