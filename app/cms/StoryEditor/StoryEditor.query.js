import gql from 'graphql-tag'
import {graphql } from 'react-apollo'
import fragment from './StoryEditor.fragment'

export const StoryQuery = gql`
  query StoryInfoQuery (
    $storyId: ID!
  ) {
    story (
      id: $storyId
    ) {
      ...StoryEditorFragment
    }
  }

  ${fragment}
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
