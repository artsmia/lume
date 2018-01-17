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
    $visibility: VisibilityEnum
  ) {
    editStory(
      id: $id
      title: $title
      description: $description
      previewImageId: $previewImageId
      template: $template
      visibility: $visibility
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
      template,
      visibility
    }) => mutate({
      variables: {
        id: storyId,
        title,
        description,
        previewImageId,
        template,
        visibility
      },
    }),
  }),

}

export default graphql(editStory, mutationConfig)
