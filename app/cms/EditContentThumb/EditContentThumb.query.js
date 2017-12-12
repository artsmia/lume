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
        index
      }

      ... on Detail {
        id
        title
        index
      }

      ... on Movie {
        id
        title
        index
      }

      ... on Obj {
        id
        title
        index
      }

      ... on Picture {
        id
        title
        index
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
