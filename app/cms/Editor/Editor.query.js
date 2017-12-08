import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const StoryQuery = gql`
  query StoryQuery (
    $storyId: ID!
  ) {
    story (
      id: $storyId
    ) {
      id
      title
      contents {
        ... on Comparison {
          id
        }

        ... on Detail {
          id
        }

        ... on Movie {
          id
        }

        ... on Obj {
          id
        }

        ... on Picture {
          id
        }

      }
    }
  }

`


const queryConfig = {
  options: ({storyId}) => ({
    variables: {
      storyId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(StoryQuery, queryConfig)
