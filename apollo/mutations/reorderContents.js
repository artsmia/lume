import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'


const reorderContents = gql`
  mutation reorderContents (
    $storyId: ID!
    $contentIds: [ID]
  ) {
    reorderContents(
      storyId: $storyId
      contentIds: $contentIds
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}

`

const mutationConfig = {
  props: ({mutate, ownProps: {storyId} }) => ({
    reorderContents: ({
      contentIds
    }) => mutate({
      variables: {
        storyId,
        contentIds
      },
    }),
  }),

}

export default graphql(reorderContents, mutationConfig)
