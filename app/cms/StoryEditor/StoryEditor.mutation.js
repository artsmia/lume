import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

const editStory = gql`
  mutation editStory (
    $id: ID!
    $title: String
    $description: String
    $previewImageId: ID
  ) {
    editStory(
      id: $id
      title: $title
      description: $description
      previewImageId: $previewImageId
    ) {
      id
      title
      description
      previewImage{
        id
      }
    }
  }
`

const mutationConfig = {
  props: ({mutate, ownProps: {storyId} }) => ({
    editStory: ({
      title,
      description,
      previewImageId
    }) => mutate({
      variables: {
        id: storyId,
        title,
        description,
        previewImageId
      },
    }),
  }),

}

export default graphql(editStory, mutationConfig)
