import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


const ContentThumbQuery = gql`
  query ContentThumbQuery (
    $contentId: ID!
    $type: ContentEnum!
  ) {
    content (
      id: $contentId
      type: $type
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
  options: ({contentId, type}) => ({
    variables: {
      contentId,
      type
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    ...data
  }),
}


export default graphql(ContentThumbQuery, queryConfig)
