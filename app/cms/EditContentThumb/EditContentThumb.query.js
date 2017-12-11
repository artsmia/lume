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
