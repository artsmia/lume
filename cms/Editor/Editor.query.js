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
      previewImage {
        id
      }
      contents {
        ... on Comparison {
          id
          index
        }

        ... on Detail {
          id
          index
        }

        ... on Movie {
          id
          index
        }

        ... on Obj {
          id
          index
        }

        ... on Picture {
          id
          index
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
