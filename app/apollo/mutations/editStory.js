import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import storyFragment from '../fragments/story'


const editStory = gql`
  mutation editStory (
    $id: ID!
    $title: String
    $description: String
    $template: TemplateEnum
    $previewImageId: ID
  ) {
    editStory(
      id: $id
      title: $title
      description: $description
      previewImageId: $previewImageId
      template: $template
    ) {
      ...StoryFragment
    }
  }
  ${storyFragment}

`

const mutationConfig = {
  props: ({mutate, ownProps: {storyId} }) => ({
    editStory: ({
      title,
      description,
      previewImageId,
      template
    }) => mutate({
      variables: {
        id: storyId,
        title,
        description,
        previewImageId,
        template
      },
    }),
  }),

}

export default graphql(editStory, mutationConfig)
