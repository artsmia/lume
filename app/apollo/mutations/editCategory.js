import {graphql } from 'react-apollo'
import gql from 'graphql-tag'
import categoryFragment from '../fragments/category'


const editCategory = gql`
  mutation editCategory (
    $title: String
    $description: String
    $imageId: ID
  ) {
    editCategory(
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
  props: ({mutate, ownProps: {categoryId} }) => ({
    editCategory: (obj) => mutate({
      variables: {
        id: categoryId
      },
    }),
  }),

}

export default graphql(editCategory, mutationConfig)
