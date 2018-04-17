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
  props: ({mutate, ownProps}) => ({
    reorderContents: ({
      contentIds,
      storyId
    }) => mutate({
      variables: {
        storyId,
        contentIds
      },
    }),
  }),

}

export default graphql(reorderContents, mutationConfig)
