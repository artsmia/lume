import { graphql } from "react-apollo"
import gql from "graphql-tag"
import imageFragment from "../fragments/image"

const editImage = gql`
  mutation editImage($id: ID!, $title: String, $description: String) {
    editImage(id: $id, title: $title, description: $description) {
      ...ImageFragment
    }
  }
  ${imageFragment}
`

const mutationConfig = {
  props: ({ mutate, ownProps: { categoryId } }) => ({
    editImage: image => {
      console.log("edit Image called")
      mutate({
        variables: {
          ...image
        }
      })
    }
  })
}

export default graphql(editImage, mutationConfig)
