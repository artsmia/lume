import gql from 'graphql-tag'
import {graphql } from 'react-apollo'


const StoryThumbQuery = gql`
  query StoryThumbQuery (
    $storyId: ID!
  ) {
    story (
      id: $storyId
    ) {
      id
      title
      previewImage{
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


export default graphql(StoryThumbQuery, queryConfig)
