import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fragment from './DetailEditor.fragment'


const editDetail = gql`
  mutation editDetail (
    $id: ID!
    $title: String
    $description: String
    $imageId: ID
  ) {
    editDetail(
      id: $id
      title: $title
      description: $description
      imageId: $imageId
    ) {
      ...DetailEditorFragment
    }
  }

  ${fragment}
`

const mutationConfig = {
  props: ({mutate, ownProps: {detailId} }) => ({
    editDetail: ({
      title,
      description,
      imageId
    }) => mutate({
      variables: {
        id: detailId,
        title,
        description,
        imageId
      },
    }),
  }),

}

export default graphql(editDetail, mutationConfig)
