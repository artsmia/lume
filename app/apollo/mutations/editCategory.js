import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import categoryFragment from '../fragments/category'

const editCategory = gql`
  mutation editCategory(
    $id: ID!
    $title: String
    $description: String
    $imageId: ID
  ) {
    editCategory(
      id: $id
      title: $title
      description: $description
      imageId: $imageId
    ) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`

const mutationConfig = {
  props: ({ mutate, ownProps: { categoryId } }) => ({
    editCategory: category =>
      mutate({
        variables: {
          ...category,
          id: categoryId
        }
      })
  })
}

export default graphql(editCategory, mutationConfig)
