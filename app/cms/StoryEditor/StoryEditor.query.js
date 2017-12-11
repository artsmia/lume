import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


export const StoryQuery = gql`
  query StoryInfoQuery (
    $storyId: ID!
  ) {
    story (
      id: $storyId
    ) {
      id
      title
      description
      previewImage {
        id
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
