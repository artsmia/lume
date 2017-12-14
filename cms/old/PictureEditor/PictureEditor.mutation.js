import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fragment from './PictureEditor.fragment'


const editPicture = gql`
  mutation editPicture (
    $id: ID!
    $title: String
    $description: String
    $imageId: ID
  ) {
    editPicture(
      id: $id
      title: $title
      description: $description
      imageId: $imageId
    ) {
      ...PictureEditorFragment
    }
  }

  ${fragment}
`

const mutationConfig = {
  props: ({mutate, ownProps: {pictureId} }) => ({
    editPicture: ({
      title,
      description,
      imageId
    }) => mutate({
      variables: {
        id: pictureId,
        title,
        description,
        imageId
      },
    }),
  }),

}

export default graphql(editPicture, mutationConfig)
