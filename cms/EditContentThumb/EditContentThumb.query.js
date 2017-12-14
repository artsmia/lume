import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


const ContentThumbQuery = gql`
  query ContentThumbQuery (
    $contentId: ID!
    $type: ContentEnum!
    $storyId: ID!
  ) {
    content (
      id: $contentId
      type: $type
      storyId: $storyId
    ) {
      ... on Comparison {
        id
        title
      }

      ... on Detail {
        id
        title
      }

      ... on Movie {
        id
        title
      }

      ... on Obj {
        id
        title
      }

      ... on Picture {
        id
        title
      }
    }
  }

`


const queryConfig = {
  options: ({contentId, type, storyId}) => ({
    variables: {
      contentId,
      type,
      storyId
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(ContentThumbQuery, queryConfig)
