import {graphql, compose } from 'react-apollo'
import Edit from './Edit'

import gql from 'graphql-tag'

const query = gql`
  query story (
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


const storyQuery = graphql(query, queryConfig)


export default compose(
  storyQuery,
)(
  Edit
)
