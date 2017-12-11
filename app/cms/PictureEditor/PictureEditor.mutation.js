import {graphql } from 'react-apollo'
import gql from 'graphql-tag'

const editPicture = gql`
  mutation editPicture (
    $id: ID!
    $title: String
    $description: String
  ) {
    editPicture(
      id: $id
      title: $title
      description: $description
    ) {
      id
      title
      description
    }
  }
`

const mutationConfig = {
  props: ({mutate, ownProps: {pictureId} }) => ({
    editPicture: ({
      title,
      description,
    }) => mutate({
      variables: {
        id: pictureId,
        title,
        description,
      },
    }),
  }),

}

export default graphql(editPicture, mutationConfig)
