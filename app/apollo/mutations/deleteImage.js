import { graphql } from "react-apollo"
import gql from "graphql-tag"

const deleteImage = gql`
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id)
  }
`

const mutationConfig = {
  props: ({ mutate, ownProps }) => ({
    deleteImage: variables =>
      mutate({
        variables: {
          categoryId
        }
      })
  })
}

export default graphql(deleteImage, mutationConfig)
